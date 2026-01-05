import { Controller, Post, Body, Get, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    try {
      const user = await this.authService.validateUser(loginDto.email, loginDto.password);
      return this.authService.login(user);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return {
      id: req.user.id,
      email: req.user.email,
      fullName: req.user.fullName,
      role: req.user.role.name,
    };
  }

  @Post('register')
  async register(
    @Body()
    registerDto: {
      email: string;
      password: string;
      fullName: string;
      phone?: string;
    },
  ) {
    try {
      const user = await this.authService.register(registerDto);
      return this.authService.login(user);
    } catch (error: any) {
      // Log the error for debugging
      console.error('Registration error:', error);
      
      // Return proper error response
      if (error instanceof HttpException) {
        throw error;
      }
      
      // Handle Prisma errors
      if (error.code === 'P2002') {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }
      
      // Handle other errors
      throw new HttpException(
        error.message || 'Registration failed. Please try again.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('logout')
  logout() {
    return { message: 'Logged out successfully' };
  }
}

