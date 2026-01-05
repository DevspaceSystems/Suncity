import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeadersService } from './leaders.service';

@Controller('leaders')
export class LeadersController {
  constructor(private readonly leadersService: LeadersService) {}

  @Post()
  create(@Body() createLeaderDto: any) {
    return this.leadersService.create(createLeaderDto);
  }

  @Get()
  findAll() {
    return this.leadersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeaderDto: any) {
    return this.leadersService.update(id, updateLeaderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadersService.remove(id);
  }
}

