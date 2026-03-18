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
import { CREATE_HALL, DELETE_HALL, UPDATE_HALL } from '@shared/constants';
import {
  AuthorizeByPermission,
  PaginationOptions,
  SkipAuth,
  Url,
} from '@shared/decorators';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateHallDto } from './dto/create-hall.dto';
import { UpdateHallDto } from './dto/update-hall.dto';
import { HallService } from './hall.service';

@Controller('halls')
export class HallController {
  constructor(private readonly service: HallService) {}

  @Post()
  @AuthorizeByPermission([CREATE_HALL])
  async create(@Body() dto: CreateHallDto) {
    return await this.service.create(dto);
  }

  @Get()
  @SkipAuth()
  @PaginationOptions({
    sortOptions: [{ example: 'createdAt:DESC' }],
    filterOptions: [
      { field: 'name', example: '$eq:hall-name-1' },
      { field: 'rows', example: '$lte:2', type: Number },
    ],
  })
  async findAll(@Paginate() query: PaginateQuery, @Url() url: string) {
    return await this.service.findAll(query, url);
  }

  @Get(':id')
  @SkipAuth()
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @AuthorizeByPermission([UPDATE_HALL])
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateHallDto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @AuthorizeByPermission([DELETE_HALL])
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.remove(id);
  }
}
