import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  AppCacheInterceptor,
  GlobalApplicationInterceptor,
} from '@shared/interceptors';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalApplicationInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AppCacheInterceptor,
    },
  ],
  exports: [],
})
export class GlobalApplicationInterceptorModule {}
