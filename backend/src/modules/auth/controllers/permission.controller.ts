import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  CREATE_PERMISSION,
  READ_PERMISSION,
} from '@shared/constants/permissions/permission';
import { AuthorizeByPermission } from '@shared/decorators/authorization.decorator';
import { CreatePermissionDto } from '../dto/create-permission.dto';
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
