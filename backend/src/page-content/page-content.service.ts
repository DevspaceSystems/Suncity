import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PageContentService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PageContentCreateInput) {
    return this.prisma.pageContent.create({ data });
  }

  async findAll(page?: string) {
    const where = page ? { page } : {};
    return this.prisma.pageContent.findMany({
      where,
      orderBy: [{ page: 'asc' }, { order: 'asc' }],
      include: { createdBy: { select: { id: true, fullName: true, email: true } } },
    });
  }

  async findByPageAndSection(page: string, section: string) {
    return this.prisma.pageContent.findFirst({
      where: { page, section, isActive: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.pageContent.findUnique({
      where: { id },
      include: { createdBy: { select: { id: true, fullName: true, email: true } } },
    });
  }

  async update(id: string, data: Prisma.PageContentUpdateInput) {
    return this.prisma.pageContent.update({
      where: { id },
      data,
    });
  }

  async upsert(page: string, section: string, data: Prisma.PageContentCreateInput) {
    const existing = await this.prisma.pageContent.findFirst({
      where: { page, section },
    });

    if (existing) {
      return this.prisma.pageContent.update({
        where: { id: existing.id },
        data,
      });
    } else {
      return this.prisma.pageContent.create({
        data: { ...data, page, section } as Prisma.PageContentCreateInput,
      });
    }
  }

  async remove(id: string) {
    return this.prisma.pageContent.delete({
      where: { id },
    });
  }
}

