import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BusinessesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BusinessCreateInput) {
    return this.prisma.business.create({ data });
  }

  async findAll(params?: { sector?: string; area?: string; isVerified?: boolean }) {
    const where: any = {};
    if (params?.sector) where.sector = params.sector;
    if (params?.area) where.area = params.area;
    if (params?.isVerified !== undefined) where.isVerified = params.isVerified;
    
    return this.prisma.business.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { createdBy: { select: { id: true, fullName: true, email: true } } },
    });
  }

  async findOne(id: string) {
    return this.prisma.business.findUnique({
      where: { id },
      include: { createdBy: { select: { id: true, fullName: true, email: true } } },
    });
  }

  async update(id: string, data: Prisma.BusinessUpdateInput) {
    return this.prisma.business.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.business.delete({
      where: { id },
    });
  }
}

