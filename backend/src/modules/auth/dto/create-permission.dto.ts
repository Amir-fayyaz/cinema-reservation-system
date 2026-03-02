import { ApiProperty } from '@nestjs/swagger';
import { Exists } from '@shared/validators/is-exists.validator';
import { IsString } from 'class-validator';
import { PermissionCategory } from '../entities/permission-category.entity';
import { User } from '../entities/user.entity';

export class CreatePermissionDto {
  @ApiProperty({ example: 'name-1' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'f1f4f33d-d2db-4228-8e83-c3241efd2592' })
  @Exists(User)
  userId: string;

  @ApiProperty({ example: '7ca85623-6453-42d9-9ca5-b4b5bcc90081' })
  @Exists(PermissionCategory)
  categoryId: string;
}
