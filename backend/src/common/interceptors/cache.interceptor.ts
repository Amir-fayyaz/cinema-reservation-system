import { CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NO_CACHE_METADATA } from '@shared/constants';
import { Cache } from 'cache-manager';

@Injectable()
export class AppCacheInterceptor
  extends CacheInterceptor
  implements NestInterceptor
{
  constructor(cacheManager: Cache, reflector: Reflector) {
    super(cacheManager, reflector);
  }

  trackBy(context: ExecutionContext): string | undefined {
    const noCache = this.reflector.get<boolean>(
      NO_CACHE_METADATA,
      context.getHandler(),
    );

    if (noCache) {
      return;
    }

    return super.trackBy(context);
  }
}
