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
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksPaginationDto } from './dtos/pagination.dto';
import { createBookDto } from './dtos/create.dto';
import { updateBookDto } from './dtos/update.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(@Query() query: BooksPaginationDto) {
    return await this.booksService.fetchAll(query);
  }

  @Get(':id')
  async getBook(@Param('id', ParseIntPipe) id: number) {
    return await this.booksService.getBook(id);
  }

  @Post()
  async createBook(@Body() dto: createBookDto) {
    await this.booksService.createBook(dto);
  }

  @Patch(':id')
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: updateBookDto,
  ) {
    await this.booksService.updateBook(id, dto);
  }

  @Delete(':id')
  async deleteBook(@Param('id', ParseIntPipe) id: number) {
    await this.booksService.deleteOne(id);
  }
}
