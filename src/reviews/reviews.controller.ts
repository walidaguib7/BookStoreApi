import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReviewPaginationDto } from './dtos/pagination.dto';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/utils/enums';
import { createReviewDto } from './dtos/create.dto';
import { updateReviewDto } from './dtos/update.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all/:bookId')
  async getAll(
    @Query() query: ReviewPaginationDto,
    @Param('bookId', ParseIntPipe) bookId: number,
  ) {
    return await this.reviewsService.fetchAll(query, bookId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.reviewsService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Customer)
  @Post()
  async createOne(@Body() dto: createReviewDto) {
    await this.reviewsService.createOne(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Customer)
  @Patch(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: updateReviewDto,
  ) {
    await this.reviewsService.updateOne(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    await this.reviewsService.deleteOne(id);
  }
}
