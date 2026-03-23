import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CREATE_SCREENING, UPDATE_SCREENING } from '@shared/constants';
import {
  AuthorizeByPermission,
  PaginationOptions,
  SkipAuth,
  Url,
} from '@shared/decorators';
import { ScreeningStatus } from '@shared/enums';
import { NotEmptyBodyPipe } from '@shared/pipes';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { PaginateScreeningResponse } from './dto/paginate-screening-response.dto';
import { UpdateScreeningDto } from './dto/update-screening.dto';
import { ScreeningService } from './screening.service';

@Controller('screening')
export class ScreeningController {
  constructor(private readonly service: ScreeningService) {}

  @Post()
  @AuthorizeByPermission([CREATE_SCREENING])
  async create(@Body() dto: CreateScreeningDto) {
    return await this.service.create(dto);
  }

  @Get()
  @SkipAuth()
  @ApiOkResponse({ type: PaginateScreeningResponse })
  @PaginationOptions({
    sortOptions: [{ example: 'startTime:DESC' }, { example: 'createdAt:DESC' }],
    filterOptions: [
      {
        field: 'status',
        enum: ScreeningStatus,
        example: `$eq:${ScreeningStatus.ACTIVE}`,
      },
      { field: 'startTime', example: '$eq:2026-04-22 14:48:22' },
      {
        field: 'movie.id',
        example: '$eq:fec8ee0c-0143-4076-8bb5-e645e35d9c14',
      },
      { field: 'hall.id', example: '$eq:43307347-5176-4a2c-9a49-56082d2ce317' },
      { field: 'movie.name', example: '$ilike:movie-1' },
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
  @AuthorizeByPermission([UPDATE_SCREENING])
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(NotEmptyBodyPipe) dto: UpdateScreeningDto,
  ) {
    return await this.service.update(id, dto);
  }
}
