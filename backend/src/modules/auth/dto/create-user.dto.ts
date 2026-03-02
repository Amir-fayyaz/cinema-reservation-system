import { ApiProperty } from '@nestjs/swagger';
import { ApplicationRoles, GenderEnum } from '@shared/enums';
import { IsDateOnly, IsUnique } from '@shared/validators';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'Amir-hossein', required: false })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ example: '09921810208', required: false })
  @IsPhoneNumber('IR')
  @IsUnique(User)
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'example@gmail.com', required: false })
  @IsEmail()
  @IsUnique(User)
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: ApplicationRoles.USER,
    enum: ApplicationRoles,
    required: false,
  })
  @IsEnum(ApplicationRoles)
  role: ApplicationRoles;

  @ApiProperty({ example: 'example-pass', required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ example: GenderEnum.MAN, enum: GenderEnum, required: false })
  @IsEnum(GenderEnum)
  @IsOptional()
  gender: GenderEnum;

  @ApiProperty({ example: '2025-11-02', required: false })
  @IsDateOnly()
  @IsOptional()
  birthDate: Date;

  @IsOptional()
  userId?: string;
}
