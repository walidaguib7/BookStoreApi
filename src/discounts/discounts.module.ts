import { Module } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { DiscountsController } from './discounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/books/book.entity';
import { Category } from 'src/category/category.entity';
import { Discount } from './discounts.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CacheModule } from 'src/config/cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Category, Discount]),
    AuthModule,
    CacheModule,
  ],
  controllers: [DiscountsController],
  providers: [DiscountsService],
})
export class DiscountsModule {}
