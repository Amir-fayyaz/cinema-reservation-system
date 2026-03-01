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
  CREATE_PERMISSION_CATEGORY,
  DELETE_PERMISSION_CATEGORY,
  READ_PERMISSION_CATEGORY,
  UPDATE_PERMISSION_CATEGORY,
} from '@shared/constants/permissions/permission-category';
import { AuthorizeByPermission } from '@shared/decorators/authorization.decorator';
import { CreatePermissionCategoryDto } from '../dto/create-permission-category.dto';
import { UpdatePermissionCategoryDto } from '../dto/update-permission-category.dto';
import { PermissionCategoryService } from '../services/permission-category.service';

@Controller('permission-category')
export class PermissionCategoryController {
  constructor(private readonly service: PermissionCategoryService) {}

  @Post()
  @AuthorizeByPermission([CREATE_PERMISSION_CATEGORY])
  async create(@Body() dto: CreatePermissionCategoryDto) {
    return await this.service.create(dto);
  }

  @Get()
  @AuthorizeByPermission([READ_PERMISSION_CATEGORY])
  async findAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  @AuthorizeByPermission([READ_PERMISSION_CATEGORY])
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @AuthorizeByPermission([UPDATE_PERMISSION_CATEGORY])
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePermissionCategoryDto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @AuthorizeByPermission([DELETE_PERMISSION_CATEGORY])
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.remove(id);
  }
}
