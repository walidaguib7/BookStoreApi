import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Order } from './orders.entity';
import { Book } from 'src/books/book.entity';
import { CacheModule } from 'src/config/cache/cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order, Book]), CacheModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
