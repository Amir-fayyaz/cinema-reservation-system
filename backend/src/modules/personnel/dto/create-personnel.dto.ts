import { User } from '@core/auth/entities/user.entity';
import { Position } from '@core/position/entities/position.entity';
import { Exists, IsUnique } from '@shared/validators';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Personnel } from '../entities/personnel.entity';

export class CreatePersonnelDto {
  @IsNumber()
  salary: number;

  @IsString()
  @IsOptional()
  resume?: string;

  @IsString()
  @IsUnique(Personnel)
  personnelNumber: string;

  @Exists(User)
  @IsUnique(Personnel)
  @IsUUID()
  userId: string;

  @Exists(Position)
  @IsUUID()
  positionId: string;
}
