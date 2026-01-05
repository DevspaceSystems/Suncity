import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  create(@Body() createDto: any) {
    return this.newsService.create(createDto);
  }

  @Get()
  async findAll(@Query('isPublished') isPublished?: string, @Query('category') category?: string) {
    const data = await this.newsService.findAll({
      isPublished: isPublished === 'true' ? true : undefined,
      category,
    });
    return { data };
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    const data = await this.newsService.findBySlug(slug);
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.newsService.findOne(id);
    return { data };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.newsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}

