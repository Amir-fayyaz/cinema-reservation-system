import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  CREATE_PERSONNEL,
  DELETE_PERSONNEL,
  READ_PERSONNEL,
  UPDATE_PERSONNEL,
} from '@shared/constants';
import {
  AuthorizeByPermission,
  PaginationOptions,
  Url,
} from '@shared/decorators';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { PaginatePersonnelResponse } from './dto/paginate-personnel-response.dto';
import { UpdatePersonnelDto } from './dto/update-personnel.dto';
import { PersonnelService } from './personnel.service';

@Controller('personnel')
export class PersonnelController {
  constructor(private readonly service: PersonnelService) {}

  @Post()
  @AuthorizeByPermission([CREATE_PERSONNEL])
  async create(@Body() dto: CreatePersonnelDto) {
    return await this.service.create(dto);
  }

  @Get()
  @AuthorizeByPermission([READ_PERSONNEL])
  @ApiOkResponse({ type: PaginatePersonnelResponse })
  @PaginationOptions({
    sortOptions: [{ example: 'createdAt:DESC' }],
    filterOptions: [
      { field: 'personnelNumber', example: '$eq:12345' },
      { field: 'position.name', example: '$eq:position-name-1' },
    ],
  })
  async findAll(@Paginate() query: PaginateQuery, @Url() url: string) {
    return await this.service.findAll(query, url);
  }

  @Get(':id')
  @AuthorizeByPermission([READ_PERSONNEL])
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @AuthorizeByPermission([UPDATE_PERSONNEL])
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePersonnelDto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @AuthorizeByPermission([DELETE_PERSONNEL])
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.remove(id);
  }
}
