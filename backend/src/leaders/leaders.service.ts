import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LeadersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.LeaderCreateInput) {
    return this.prisma.leader.create({ data });
  }

  async findAll() {
    return this.prisma.leader.findMany({
      orderBy: { order: 'asc' },
      include: { createdBy: { select: { id: true, fullName: true, email: true } } },
    });
  }

  async findOne(id: string) {
    return this.prisma.leader.findUnique({
      where: { id },
      include: { createdBy: { select: { id: true, fullName: true, email: true } } },
    });
  }

  async update(id: string, data: Prisma.LeaderUpdateInput) {
    return this.prisma.leader.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.leader.delete({
      where: { id },
    });
  }
}

