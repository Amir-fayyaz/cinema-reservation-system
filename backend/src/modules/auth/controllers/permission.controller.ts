import { Body, Controller, Get, Post } from '@nestjs/common';
import { CREATE_PERMISSION, READ_PERMISSION } from '@shared/constants';
import { AuthorizeByPermission } from '@shared/decorators';
import { CreatePermissionDto } from '../dto';
import { PermissionService } from '../services/permission.service';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly service: PermissionService) {}

  @Post()
  @AuthorizeByPermission([CREATE_PERMISSION])
  async create(@Body() dto: CreatePermissionDto) {
    return await this.service.create(dto);
  }

  @Get()
  @AuthorizeByPermission([READ_PERMISSION])
  async findAll() {}
}
