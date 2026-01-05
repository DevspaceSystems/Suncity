import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.NewsCreateInput) {
    // Generate slug from title if not provided
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    return this.prisma.news.create({ data });
  }

  async findAll(params?: { isPublished?: boolean; category?: string }) {
    const where: any = {};
    if (params?.isPublished !== undefined) {
      where.isPublished = params.isPublished;
    }
    if (params?.category) {
      where.category = params.category;
    }
    return this.prisma.news.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      include: { createdBy: { select: { id: true, fullName: true, email: true } } },
    });
  }

  async findOne(id: string) {
    return this.prisma.news.findUnique({
      where: { id },
      include: { createdBy: { select: { id: true, fullName: true, email: true } } },
    });
  }

  async findBySlug(slug: string) {
    const news = await this.prisma.news.findUnique({
      where: { slug },
      include: { createdBy: { select: { id: true, fullName: true, email: true } } },
    });
    
    // Increment views
    if (news) {
      await this.prisma.news.update({
        where: { id: news.id },
        data: { views: { increment: 1 } },
      });
    }
    
    return news;
  }

  async update(id: string, data: Prisma.NewsUpdateInput) {
    return this.prisma.news.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.news.delete({
      where: { id },
    });
  }
}

