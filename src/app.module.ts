import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/database/data-source';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as redisStore from 'cache-manager-redis-store';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { MediaModule } from './media/media.module';
import { MailModule } from './config/mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { CategoryModule } from './category/category.module';
import { PublishersModule } from './publishers/publishers.module';
import { ReviewsModule } from './reviews/reviews.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { DiscountsModule } from './discounts/discounts.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT),
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: process.env.MAIL_SENDER,
      },
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    UsersModule,
    AuthModule,
    MediaModule,
    AuthorsModule,
    BooksModule,
    CategoryModule,
    PublishersModule,
    ReviewsModule,
    WishlistsModule,
    DiscountsModule,
  ],
})
export class AppModule {}
