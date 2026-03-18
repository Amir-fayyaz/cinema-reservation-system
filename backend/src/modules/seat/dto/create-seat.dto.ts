import { Hall } from '@core/hall/entities/hall.entity';
import { Exists } from '@shared/validators';
import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

export class CreateSeatDto {
  @Exists(Hall)
  hallId: string;

  @IsInt()
  @Min(1)
  row: number;

  @IsInt()
  @Min(1)
  number: number;

  @IsOptional()
  @IsBoolean()
  isVip?: boolean;
}
