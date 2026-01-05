import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { passwordHash, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role.name };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role.name,
      },
    };
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: { role: true },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedException();
      }

      return user;
    } catch {
      throw new UnauthorizedException();
    }
  }

  async register(data: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
  }) {
    try {
      // Check if user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new UnauthorizedException('User with this email already exists');
      }

      // Check if this is the first user - assign Super Admin role
      const userCount = await this.prisma.user.count();
      let role;
      
      if (userCount === 0) {
        // First user gets Super Admin role
        role = await this.prisma.role.findFirst({
          where: { name: 'Super Admin' },
        });
        
        if (!role) {
          // If Super Admin role doesn't exist, create it
          role = await this.prisma.role.create({
            data: {
              name: 'Super Admin',
              description: 'Full system access',
            },
          });
        }
      } else {
        // Subsequent users get Editor role by default
        role = await this.prisma.role.findFirst({
          where: { name: 'Editor' },
        });
        
        if (!role) {
          // If Editor role doesn't exist, create it
          role = await this.prisma.role.create({
            data: {
              name: 'Editor',
              description: 'Content management access',
            },
          });
        }
      }

      if (!role) {
        throw new Error('Failed to find or create role');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // Create user
      const user = await this.prisma.user.create({
        data: {
          email: data.email,
          passwordHash: hashedPassword,
          fullName: data.fullName,
          phone: data.phone,
          roleId: role.id,
          isActive: true,
          emailVerified: true, // Auto-verify for now
        },
        include: { role: true },
      });

      const { passwordHash, ...result } = user;
      return result;
    } catch (error: any) {
      console.error('Registration service error:', error);
      
      // Re-throw known exceptions
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      // Handle Prisma errors
      if (error.code === 'P2002') {
        throw new UnauthorizedException('Email already exists');
      }
      
      // Handle other errors
      throw new Error(`Registration failed: ${error.message || 'Unknown error'}`);
    }
  }
}

