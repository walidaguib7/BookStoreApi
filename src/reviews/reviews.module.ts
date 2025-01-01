import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/books/book.entity';
import { User } from 'src/users/users.entity';
import { Review } from './review.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CacheModule } from 'src/config/cache/cache.module';
import { UsersModule } from 'src/users/users.module';
import { BooksModule } from 'src/books/books.module';
import { JwtService } from '@nestjs/jwt';
import { BooksService } from 'src/books/books.service';
import { Category } from 'src/category/category.entity';
import { Authors } from 'src/authors/authors.entity';
import { Media } from 'src/media/media.entity';
import { Publisher } from 'src/publishers/publishers.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Review,
      Book,
      User,
      Category,
      Authors,
      Media,
      Publisher,
    ]),
    AuthModule,
    CacheModule,
    UsersModule,
    BooksModule,
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, JwtService, BooksService],
})
export class ReviewsModule {}
