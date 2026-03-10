import { TypeOrmConfig } from '@config/typeorm.config';
import { AuthModule } from '@core/auth/auth.module';
import { HealthController } from '@core/health/health.controller';
import { PositionModule } from '@core/position/position.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppCacheInterceptor } from '@shared/interceptors/cache.interceptor';
import {
  AppCacheModule,
  AuthorizationModule,
  EventStoreModule,
  RedisModule,
} from '@shared/modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
    EventEmitterModule.forRoot({
      global: true,
      ignoreErrors: false,
      verboseMemoryLeak: true,
      newListener: true,
      removeListener: true,
    }),
    ScheduleModule.forRoot(),
    RedisModule.forRootAsync(),
    AppCacheModule,
    AuthorizationModule,
    EventStoreModule,
    AuthModule,
    PositionModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AppCacheInterceptor,
    },
  ],
})
export class AppModule {}
