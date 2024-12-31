import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Authors } from 'src/authors/authors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Authors])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
