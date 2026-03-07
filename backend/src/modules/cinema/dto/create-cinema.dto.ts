import { Address } from '@core/address/entities/address.entity';
import { User } from '@core/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CinemaStatus } from '@shared/enums';
import { Exists, IsUnique } from '@shared/validators';
import { IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { Cinema } from '../entities/cinema.entity';

export class CreateCinemaDto {
  @ApiProperty({ example: 'cinema-1' })
  @IsString()
  name: string;

  @ApiProperty({ example: '0915568791' })
  @IsPhoneNumber('IR')
  @IsUnique(Cinema)
  phone: string;

  @ApiProperty({ example: '7ca85623-6453-42d9-9ca5-b4b5bcc90081' })
  @Exists(Address)
  addressId: string;

  @ApiProperty({ example: '7ca85623-6453-42d9-9ca5-b4b5bcc90081' })
  @Exists(User)
  ownerId: string;

  @ApiProperty({
    enum: CinemaStatus,
    required: false,
    default: CinemaStatus.PENDING,
  })
  @IsEnum(CinemaStatus)
  @IsOptional()
  status: CinemaStatus;
}
