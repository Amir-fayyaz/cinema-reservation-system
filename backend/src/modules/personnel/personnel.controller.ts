import { Body, Controller, Post } from '@nestjs/common';
import { CREATE_PERSONNEL } from '@shared/constants';
import { AuthorizeByPermission } from '@shared/decorators';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { PersonnelService } from './personnel.service';

@Controller('personnel')
export class PersonnelController {
  constructor(private readonly service: PersonnelService) {}

  @Post()
  @AuthorizeByPermission([CREATE_PERSONNEL])
  async create(@Body() dto: CreatePersonnelDto) {
    return await this.service.create(dto);
  }
}
