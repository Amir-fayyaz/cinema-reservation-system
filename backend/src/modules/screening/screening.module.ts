import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Screening } from './entities/screening.entity';
import { ScreeningController } from './screening.controller';
import { ScreeningRepository } from './screening.repository';
import { ScreeningService } from './screening.service';

@Module({
  imports: [TypeOrmModule.forFeature([Screening])],
  controllers: [ScreeningController],
  providers: [ScreeningService, ScreeningRepository],
  exports: [],
})
export class ScreeningModule {}
