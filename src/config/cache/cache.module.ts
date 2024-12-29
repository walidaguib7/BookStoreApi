import { Module } from '@nestjs/common';
import { CachingService } from './cache.service';

@Module({
  providers: [CachingService],
  exports: [CachingService],
})
export class CacheModule {}
