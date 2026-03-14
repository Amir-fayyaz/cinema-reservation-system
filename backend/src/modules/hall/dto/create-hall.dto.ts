import { IsInt, IsString, Min } from 'class-validator';

export class CreateHallDto {
  @IsString()
  name: string;

  @Min(0)
  @IsInt()
  rows: number;

  @Min(0)
  @IsInt()
  seatsPerRows: number;
}
