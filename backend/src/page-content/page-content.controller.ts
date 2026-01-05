import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PageContentService } from './page-content.service';

@Controller('page-content')
export class PageContentController {
  constructor(private readonly pageContentService: PageContentService) {}

  @Post()
  create(@Body() createDto: any) {
    return this.pageContentService.create(createDto);
  }

  @Get()
  findAll(@Query('page') page?: string) {
    return this.pageContentService.findAll(page);
  }

  @Get(':page/:section')
  findByPageAndSection(@Param('page') page: string, @Param('section') section: string) {
    return this.pageContentService.findByPageAndSection(page, section);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pageContentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.pageContentService.update(id, updateDto);
  }

  @Post('upsert')
  upsert(@Body() upsertDto: { page: string; section: string; data: any }) {
    return this.pageContentService.upsert(upsertDto.page, upsertDto.section, upsertDto.data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pageContentService.remove(id);
  }
}

