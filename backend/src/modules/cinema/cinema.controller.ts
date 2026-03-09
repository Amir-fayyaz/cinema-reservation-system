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
import { CREATE_CINEMA, DELETE_CINEMA, UPDATE_CINEMA } from '@shared/constants';
import {
  AuthorizeByPermission,
  PaginationOptions,
  SkipAuth,
} from '@shared/decorators';
import { CinemaStatus } from '@shared/enums';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly service: CinemaService) {}

  @Post()
  @AuthorizeByPermission([CREATE_CINEMA])
  async create(@Body() dto: CreateCinemaDto) {
    return await this.service.create(dto);
  }

  @Get()
  @SkipAuth()
  @PaginationOptions({
    sortOptions: [{ example: 'createdAt:DESC' }],
    filterOptions: [
      { field: 'name', example: '$eq:cinemaName-1' },
      {
        field: 'status',
        enum: CinemaStatus,
        example: `$eq:${CinemaStatus.APPROVED}`,
      },
      { field: 'address.city', example: '$eq:tehran' },
      { field: 'address.province', example: '$eq:Tehran' },
      { field: 'address.latitude', example: '$eq:34.2214' },
      { field: 'address.longitude', example: '$eq:134.12423' },
    ],
  })
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.service.findAll(query);
  }

  @Get(':id')
  @SkipAuth()
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @AuthorizeByPermission([UPDATE_CINEMA])
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCinemaDto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @AuthorizeByPermission([DELETE_CINEMA])
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.remove(id);
  }
}
