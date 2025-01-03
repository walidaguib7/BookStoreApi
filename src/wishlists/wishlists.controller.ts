import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { WishListsPaginationDto } from './dtos/pagination.dto';
import { AddToWishlistsDto } from './dtos/create.dto';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getAll(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() query: WishListsPaginationDto,
  ) {
    return await this.wishlistsService.fetchAll(userId, query);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addToWishList(@Body() dto: AddToWishlistsDto) {
    await this.wishlistsService.AddToWishList(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async RemoveFromWishList(@Param('id', ParseIntPipe) id: number) {
    await this.wishlistsService.RemoveFromWishList(id);
  }
}
