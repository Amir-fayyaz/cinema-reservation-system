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
import { CREATE_MOVIE, DELETE_MOVIE, UPDATE_MOVIE } from '@shared/constants';
import {
  AuthorizeByPermission,
  PaginationOptions,
  SkipAuth,
  Url,
} from '@shared/decorators';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly service: MovieService) {}

  @Post()
  @AuthorizeByPermission([CREATE_MOVIE])
  async create(@Body() dto: CreateMovieDto) {
    return await this.service.create(dto);
  }

  @Get()
  @SkipAuth()
  @PaginationOptions({
    sortOptions: [
      { example: 'releaseDate:DESC' },
      { example: 'createdAt:DESC' },
    ],
    filterOptions: [
      { field: 'name', example: '$ilike:name-1' },
      { field: 'duration', example: '$gte:1' },
      { field: 'releaseDate', example: '$eq:2024-12-06' },
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
  @AuthorizeByPermission([UPDATE_MOVIE])
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMovieDto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @AuthorizeByPermission([DELETE_MOVIE])
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.remove(id);
  }
}
