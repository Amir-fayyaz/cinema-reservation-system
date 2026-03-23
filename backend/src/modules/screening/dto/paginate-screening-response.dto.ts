import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponse } from '@shared/dto';
import { Screening } from '../entities/screening.entity';

export class PaginateScreeningResponse extends PaginationResponse {
  @ApiProperty({ type: [Screening] })
  data: Screening[];
}
