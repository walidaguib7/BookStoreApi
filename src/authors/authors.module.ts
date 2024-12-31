import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authors } from './authors.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CacheModule } from 'src/config/cache/cache.module';
import { JwtService } from '@nestjs/jwt';
import { CachingService } from 'src/config/cache/cache.service';
import { User } from 'src/users/users.entity';
import { Book } from 'src/books/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Authors, Book]), AuthModule, CacheModule],
  controllers: [AuthorsController],
  providers: [AuthorsService, JwtService, CachingService],
})
export class AuthorsModule {}
