import { ApiProperty } from '@nestjs/swagger';
import { IsUnique } from '@shared/validators/is-unique.validator';
import { PermissionCategory } from '../entities/permission-category.entity';

export class CreatePermissionCategoryDto {
  @ApiProperty({ example: 'permission-category-1' })
  @IsUnique(PermissionCategory)
  name: string;
}
