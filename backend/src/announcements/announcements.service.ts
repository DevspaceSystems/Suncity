import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AnnouncementsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AnnouncementCreateInput) {
    return this.prisma.announcement.create({ data });
  }

  async findAll(params?: { isPublished?: boolean; category?: string; priority?: string }) {
    const where: any = {};
    if (params?.isPublished !== undefined) where.isPublished = params.isPublished;
    if (params?.category) where.category = params.category;
    if (params?.priority) where.priority = params.priority;
    
    return this.prisma.announcement.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      include: { createdBy: { select: { id: true, fullName: true, email: true } } },
    });
  }

  async findOne(id: string) {
    return this.prisma.announcement.findUnique({
      where: { id },
      include: { createdBy: { select: { id: true, fullName: true, email: true } } },
    });
  }

  async update(id: string, data: Prisma.AnnouncementUpdateInput) {
    return this.prisma.announcement.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.announcement.delete({
      where: { id },
    });
  }
}

