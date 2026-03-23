import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreenSeat } from './entities/screen-seat.entity';
import { ScreenSeatController } from './screen-seat.controller';
import { ScreenSeatRepository } from './screen-seat.repository';
import { ScreenSeatService } from './screen-seat.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScreenSeat])],
  controllers: [ScreenSeatController],
  providers: [ScreenSeatService, ScreenSeatRepository],
})
export class ScreenSeatModule {}
