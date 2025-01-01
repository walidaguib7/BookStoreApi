import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { MediaModule } from 'src/media/media.module';
import { MediaService } from 'src/media/media.service';
import { Media } from 'src/media/media.entity';
import { CacheModule } from 'src/config/cache/cache.module';
import { CachingService } from 'src/config/cache/cache.service';
import { Review } from 'src/reviews/review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Media, Review]),
    forwardRef(() => AuthModule),
    MediaModule,
    CacheModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService, CachingService],
  exports: [UsersService],
})
export class UsersModule {}
