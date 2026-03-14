import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hall } from './entities/hall.entity';
import { HallController } from './hall.controller';
import { HallService } from './hall.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hall])],
  controllers: [HallController],
  providers: [HallService],
  exports: [],
})
export class HallModule {}
