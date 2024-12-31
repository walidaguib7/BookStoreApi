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
import { CategoryService } from './category.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createCategoryDto } from './dtos/create.dto';
import { updateCategoryDto } from './dtos/update.dto';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.categoryService.findall();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findbyId(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() dto: createCategoryDto) {
    await this.categoryService.createOne(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: updateCategoryDto,
  ) {
    await this.categoryService.updateOne(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    await this.categoryService.deleteOne(id);
  }
}
