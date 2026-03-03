import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ example: 'Tehran' })
  @IsString()
  province: string;

  @ApiProperty({ example: 'karaj' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'example-fullAddress' })
  @IsString()
  fullAddress: string;

  @ApiProperty({ example: '34.23453' })
  @IsLatitude()
  @IsOptional()
  latitude: string;

  @ApiProperty({ example: '98.456' })
  @IsLongitude()
  @IsOptional()
  longitude: string;
}
