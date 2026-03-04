import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindCitiesDto {
  @ApiProperty({ example: 'khorasan-razavi' })
  @IsString()
  province: string;
}
