import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Book } from 'src/books/book.entity';
import { WishLists } from './wishlists.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CacheModule } from 'src/config/cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Book, WishLists]),
    AuthModule,
    CacheModule,
  ],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}
