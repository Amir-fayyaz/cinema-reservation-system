import { Body, Controller, Post } from '@nestjs/common';
import { CREATE_SCREENING } from '@shared/constants';
import { AuthorizeByPermission } from '@shared/decorators';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { ScreeningService } from './screening.service';

@Controller('screening')
export class ScreeningController {
  constructor(private readonly service: ScreeningService) {}

  @Post()
  @AuthorizeByPermission([CREATE_SCREENING])
  async create(@Body() dto: CreateScreeningDto) {
    return await this.service.create(dto);
  }
}
