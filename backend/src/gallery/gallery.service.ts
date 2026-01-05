import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.GalleryCreateInput) {
    return this.prisma.gallery.create({ data });
  }

  async findAll(params?: { isPublished?: boolean; category?: string; mediaType?: string }) {
    const where: any = {};
    if (params?.isPublished !== undefined) where.isPublished = params.isPublished;
    if (params?.category) where.category = params.category;
    if (params?.mediaType) where.mediaType = params.mediaType;
    
    return this.prisma.gallery.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { createdBy: { select: { id: true, fullName: true, email: true } } },
    });
  }

  async findOne(id: string) {
    return this.prisma.gallery.findUnique({
      where: { id },
      include: { createdBy: { select: { id: true, fullName: true, email: true } } },
    });
  }

  async update(id: string, data: Prisma.GalleryUpdateInput) {
    return this.prisma.gallery.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.gallery.delete({
      where: { id },
    });
  }
}

