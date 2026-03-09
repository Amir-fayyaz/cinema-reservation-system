import { TypeOrmConfig } from '@config/typeorm.config';
import { AddressModule } from '@core/address/address.module';
import { AuthModule } from '@core/auth/auth.module';
import { CinemaModule } from '@core/cinema/cinema.module';
import { HealthController } from '@core/health/health.controller';
import { PersonnelModule } from '@core/personnel/personnel.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalApplicationInterceptor } from '@shared/interceptors/global.interceptor';
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
    AddressModule,
    CinemaModule,
    PersonnelModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalApplicationInterceptor,
    },
  ],
})
export class AppModule {}
