import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { createOrderDto } from './dto/create.dto';
import { updateOrderDto } from './dto/update.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('all/:userId')
  async getUserOrders(@Param('userId', ParseIntPipe) userId: number) {
    return await this.ordersService.getUserOrders(userId);
  }

  @Get(':id')
  async getOrder(@Param('id', ParseIntPipe) id: number) {
    return await this.ordersService.getOrder(id);
  }

  @Post()
  async createOne(@Body() dto: createOrderDto) {
    await this.ordersService.createOne(dto);
  }

  @Patch(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: updateOrderDto,
  ) {
    await this.ordersService.updateOne(id, dto);
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    await this.ordersService.deleteOne(id);
  }
}
