import { Hall } from '@core/hall/entities/hall.entity';
import { Movie } from '@core/movie/entities/movie.entity';
import { ScreeningStatus } from '@shared/enums';
import { Exists } from '@shared/validators';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateScreeningDto {
  @IsUUID()
  @Exists(Hall)
  hallId: string;

  @IsUUID()
  @Exists(Movie)
  movieId: string;

  @IsNotEmpty()
  @Type(() => Date)
  startTime: Date;

  @IsNumber()
  @Min(0)
  basePrice: number;

  @IsEnum(ScreeningStatus)
  @IsOptional()
  status?: ScreeningStatus;
}
