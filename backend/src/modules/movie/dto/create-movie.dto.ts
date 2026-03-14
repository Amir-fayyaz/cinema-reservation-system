import { IsDateOnly } from '@shared/validators';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  description?: string;

  @Min(1)
  @IsInt()
  duration: number;

  @IsDateOnly()
  releaseDate: Date;

  @IsUUID()
  //@Exists(File)
  fileId?: string;
}
