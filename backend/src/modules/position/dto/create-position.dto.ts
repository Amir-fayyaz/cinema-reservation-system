import { ApiProperty } from '@nestjs/swagger';
import { IsUnique } from '@shared/validators';
import { IsOptional, IsString } from 'class-validator';
import { Position } from '../entities/position.entity';

export class CreatePositionDto {
  @ApiProperty({ example: 'position-name-1' })
  @IsUnique(Position)
  name: string;

  @ApiProperty({ example: 'position-description-1', required: false })
  @IsString()
  @IsOptional()
  description: string;
}
