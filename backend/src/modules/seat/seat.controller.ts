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
import { CREATE_SEAT, DELETE_SEAT, UPDATE_SEAT } from '@shared/constants';
import {
  AuthorizeByPermission,
  AuthorizeByRole,
  PaginationOptions,
  SkipAuth,
  Url,
} from '@shared/decorators';
import { ApplicationRoles } from '@shared/enums';
import { BooleanPipe } from '@shared/pipes';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { SeatService } from './seat.service';

@Controller('seat')
@AuthorizeByRole([ApplicationRoles.ADMIN])
export class SeatController {
  constructor(private readonly service: SeatService) {}

  @Post()
  @AuthorizeByPermission([CREATE_SEAT])
  async create(@Body() dto: CreateSeatDto) {
    return await this.service.create(dto);
  }

  @Get()
  @SkipAuth()
  @PaginationOptions({
    sortOptions: [{ example: 'createdAt:DESC' }],
    filterOptions: [
      { field: 'hallId', example: '$eq:43307347-5176-4a2c-9a49-56082d2ce317' },
      { field: 'row', example: '$eq:1' },
      { field: 'number', example: '$eq:1' },
      //TODO fix boolean pipe
      { field: 'isVip', example: '$eq:1' },
    ],
  })
  async findAll(
    @Paginate(BooleanPipe) query: PaginateQuery,
    @Url() url: string,
  ) {
    return await this.service.findAll(query, url);
  }

  @Get(':id')
  @SkipAuth()
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @AuthorizeByPermission([UPDATE_SEAT])
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateSeatDto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @AuthorizeByPermission([DELETE_SEAT])
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.remove(id);
  }
}
