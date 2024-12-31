import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Authors } from 'src/authors/authors.entity';
import { Category } from 'src/category/category.entity';
import { AuthorsModule } from 'src/authors/authors.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthorsService } from 'src/authors/authors.service';
import { JwtService } from '@nestjs/jwt';
import { CacheModule } from 'src/config/cache/cache.module';
import { CachingService } from 'src/config/cache/cache.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Authors, Category]),
    AuthorsModule,
    AuthModule,
    CacheModule,
  ],
  controllers: [BooksController],
  providers: [BooksService, AuthorsService, JwtService],
})
export class BooksModule {}
