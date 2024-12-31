import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { createPublisherDto } from './dtos/create.dto';
import { updatePublisherDto } from './dtos/update.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return await this.publishersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.publishersService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() dto: createPublisherDto) {
    await this.publishersService.createOne(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: updatePublisherDto,
  ) {
    await this.publishersService.updateOne(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    await this.publishersService.deleteOne(id);
  }
}
