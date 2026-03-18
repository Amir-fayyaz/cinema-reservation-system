import { Body, Controller, Post } from '@nestjs/common';
import { CREATE_SEAT } from '@shared/constants';
import { AuthorizeByPermission } from '@shared/decorators';
import { CreateSeatDto } from './dto/create-seat.dto';
import { SeatService } from './seat.service';

@Controller('seat')
export class SeatController {
  constructor(private readonly service: SeatService) {}

  @Post()
  @AuthorizeByPermission([CREATE_SEAT])
  async create(@Body() dto: CreateSeatDto) {
    return await this.service.create(dto);
  }
}
