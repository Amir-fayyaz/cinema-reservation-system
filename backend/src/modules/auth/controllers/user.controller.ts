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
import {
  CREATE_USER,
  DELETE_USER,
  READ_USER,
  UPDATE_USER,
} from '@shared/constants';
import {
  AuthorizeByPermission,
  PaginationOptions,
  Url,
} from '@shared/decorators';
import { ApplicationRoles, GenderEnum } from '@shared/enums';
import { HashPasswordPipe } from '@shared/pipes';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { CreateUserPipe } from '../pipes';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @AuthorizeByPermission([CREATE_USER])
  async create(@Body(HashPasswordPipe, CreateUserPipe) dto: CreateUserDto) {
    return await this.service.create(dto);
  }

  @Get()
  @AuthorizeByPermission([READ_USER])
  @PaginationOptions({
    sortOptions: [{ example: 'birthDate:DESC' }, { example: 'createdAt:DESC' }],
    filterOptions: [
      { field: 'gender', enum: GenderEnum, example: '$eq:man' },
      { field: 'birthDate', example: '$eq:2025-11-02' },
      { field: 'role', enum: ApplicationRoles, example: '$eq:user' },
    ],
  })
  async findAll(@Paginate() query: PaginateQuery, @Url() url: string) {
    return await this.service.findAll(query, url);
  }

  @Get(':id')
  @AuthorizeByPermission([READ_USER])
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @AuthorizeByPermission([UPDATE_USER])
  //TODO add AtLeaseOnePipe for body
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @AuthorizeByPermission([DELETE_USER])
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.remove(id);
  }
}
