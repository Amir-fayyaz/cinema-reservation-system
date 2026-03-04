import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  AuthorizeByRole,
  PaginationOptions,
  SkipAuth,
} from '@shared/decorators';
import { ApplicationRoles } from '@shared/enums';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { FindCitiesDto } from './dto/find-cities.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Post()
  @AuthorizeByRole([
    ApplicationRoles.CINEMA_OWNER,
    ApplicationRoles.CINEMA_ADMIN,
  ])
  async create(@Body() dto: CreateAddressDto) {
    return await this.service.create(dto);
  }

  @Get()
  @AuthorizeByRole([ApplicationRoles.OWNER, ApplicationRoles.ADMIN])
  @PaginationOptions({
    sortOptions: [{ example: 'createdAt:DESC' }],
    filterOptions: [
      { field: 'city', example: '$eq:mashhad' },
      { field: 'province', example: '$eq:khorasan-razavi' },
    ],
  })
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.service.findAll(query);
  }

  @Get('provinces')
  @SkipAuth()
  async provinces() {
    return await this.service.provinces();
  }

  @Get('cities')
  @SkipAuth()
  async cities(@Query() query: FindCitiesDto) {
    return await this.service.cities(query);
  }

  @Get(':id')
  @AuthorizeByRole([ApplicationRoles.ALL])
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @AuthorizeByRole([
    ApplicationRoles.CINEMA_OWNER,
    ApplicationRoles.CINEMA_ADMIN,
  ])
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAddressDto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @AuthorizeByRole([
    ApplicationRoles.CINEMA_OWNER,
    ApplicationRoles.CINEMA_ADMIN,
  ])
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.remove(id);
  }
}
