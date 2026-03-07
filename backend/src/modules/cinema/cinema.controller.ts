import { Body, Controller, Post } from '@nestjs/common';
import { CREATE_CINEMA } from '@shared/constants';
import { AuthorizeByPermission } from '@shared/decorators';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly service: CinemaService) {}

  @Post()
  @AuthorizeByPermission([CREATE_CINEMA])
  async create(@Body() dto: CreateCinemaDto) {
    return await this.service.create(dto);
  }
}
