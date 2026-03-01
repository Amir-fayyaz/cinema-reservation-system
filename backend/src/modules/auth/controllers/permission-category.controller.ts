import { Body, Controller, Post } from '@nestjs/common';
import { CREATE_PERMISSION_CATEGORY } from '@shared/constants/permissions/permission-category';
import { AuthorizeByPermission } from '@shared/decorators/authorization.decorator';
import { CreatePermissionCategoryDto } from '../dto/create-permission-category.dto';
import { PermissionCategoryService } from '../services/permission-category.service';

@Controller('permission-category')
export class PermissionCategoryController {
  constructor(private readonly service: PermissionCategoryService) {}

  @Post()
  @AuthorizeByPermission([CREATE_PERMISSION_CATEGORY])
  async create(@Body() dto: CreatePermissionCategoryDto) {
    return await this.service.create(dto);
  }
}
