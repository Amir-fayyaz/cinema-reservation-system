import { TypeOrmConfig } from '@config/typeorm.config';
import { AuthModule } from '@core/auth/auth.module';
import { DiscountModule } from '@core/discount/discount.module';
import { HallModule } from '@core/hall/hall.module';
import { HealthController } from '@core/health/health.controller';
import { MovieModule } from '@core/movie/movie.module';
import { PersonnelModule } from '@core/personnel/personnel.module';
import { PositionModule } from '@core/position/position.module';
import { ScreeningModule } from '@core/screening/screening.module';
import { SeatModule } from '@core/seat/seat.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AppCacheModule,
  AuthorizationModule,
  EventStoreModule,
  GlobalApplicationInterceptorModule,
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
    GlobalApplicationInterceptorModule,
    AuthModule,
    PositionModule,
    PersonnelModule,
    MovieModule,
    HallModule,
    SeatModule,
    ScreeningModule,
    DiscountModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
