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
import { MediaModule } from 'src/media/media.module';
import { PublishersModule } from 'src/publishers/publishers.module';
import { Publisher } from 'src/publishers/publishers.entity';
import { Media } from 'src/media/media.entity';
import { MediaService } from 'src/media/media.service';
import { PublishersService } from 'src/publishers/publishers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Authors, Category, Publisher, Media]),
    AuthorsModule,
    AuthModule,
    CacheModule,
    MediaModule,
    PublishersModule,
  ],
  controllers: [BooksController],
  providers: [
    BooksService,
    AuthorsService,
    JwtService,
    MediaService,
    PublishersService,
  ],
})
export class BooksModule {}
