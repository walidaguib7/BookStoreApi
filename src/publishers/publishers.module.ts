import { Module } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './publishers.entity';

import { AuthModule } from 'src/auth/auth.module';
import { CacheModule } from 'src/config/cache/cache.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher]), AuthModule, CacheModule],
  controllers: [PublishersController],
  providers: [PublishersService, JwtService],
})
export class PublishersModule {}
