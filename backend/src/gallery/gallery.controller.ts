import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  create(@Body() createDto: any) {
    return this.galleryService.create(createDto);
  }

  @Get()
  async findAll(@Query() query: any) {
    const data = await this.galleryService.findAll(query);
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.galleryService.findOne(id);
    return { data };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.galleryService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleryService.remove(id);
  }
}

