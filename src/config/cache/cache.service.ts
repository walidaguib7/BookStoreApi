import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CachingService {
  private readonly logger = new Logger(CachingService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getFromCache<T>(key: string): Promise<T | null> {
    try {
      const cachedData = await this.cacheManager.get(key);
      if (!cachedData) {
        return null;
      }

      return JSON.stringify(cachedData) as T;
    } catch (error) {
      this.logger.error(
        `Error getting data from cache for key "${key}":`,
        error,
      );
      return null;
    }
  }

  async setAsync<T>(key: string, value: T): Promise<void> {
    try {
      const serializedData = JSON.stringify(value);
      await this.cacheManager.set(key, serializedData, 240); // Default TTL is 4 minutes
    } catch (error) {
      this.logger.error(`Error setting data in cache for key "${key}":`, error);
      throw new BadRequestException('Failed to set data in cache.');
    }
  }

  async removeCaching(key: string): Promise<void> {
    try {
      await this.cacheManager.del(key);
    } catch (error) {
      this.logger.error(
        `Error removing data from cache for key "${key}":`,
        error,
      );
      throw new BadRequestException('Failed to remove data from cache.');
    }
  }

  async removeByPattern(pattern: string): Promise<void> {
    try {
      // Fetch all keys matching the pattern
      const keys = await this.cacheManager.store.keys(`${pattern}*`);

      // If there are matching keys, delete them
      if (keys.length > 0) {
        for (const key of keys) {
          await this.cacheManager.del(key); // Correctly delete the key
        }
      }
    } catch (error) {
      // Log the error and rethrow a user-friendly exception
      this.logger.error(
        `Error removing data from cache by pattern "${pattern}":`,
        error,
      );
      throw new BadRequestException(
        'Failed to remove data from cache by pattern.',
      );
    }
  }
}
