import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.EventCreateInput) {
    return this.prisma.event.create({ data });
  }

  async findAll(params?: { isPublished?: boolean; startDate?: string; endDate?: string }) {
    const where: any = {};
    if (params?.isPublished !== undefined) where.isPublished = params.isPublished;
    if (params?.startDate) where.startDate = { gte: new Date(params.startDate) };
    if (params?.endDate) where.endDate = { lte: new Date(params.endDate) };
    
    return this.prisma.event.findMany({
      where,
      orderBy: { startDate: 'asc' },
      include: { createdBy: { select: { id: true, fullName: true, email: true } } },
    });
  }

  async findOne(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
      include: { createdBy: { select: { id: true, fullName: true, email: true } } },
    });
  }

  async update(id: string, data: Prisma.EventUpdateInput) {
    return this.prisma.event.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.event.delete({
      where: { id },
    });
  }
}

