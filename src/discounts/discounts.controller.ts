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
import { DiscountsService } from './discounts.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/utils/enums';
import { DiscountsPaginationDto } from './dtos/pagination.dto';
import { createDiscountDto } from './dtos/create.dto';
import { updateDiscountDto } from './dtos/update.dto';

@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get()
  async fetchAll(@Query() query: DiscountsPaginationDto) {
    return await this.discountsService.fetchAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.discountsService.getDiscount(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post()
  async createOne(@Body() dto: createDiscountDto) {
    await this.discountsService.createOne(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: updateDiscountDto,
  ) {
    await this.discountsService.updateOne(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    await this.discountsService.deleteOne(id);
  }
}
