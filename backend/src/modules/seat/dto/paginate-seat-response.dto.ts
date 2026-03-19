import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponse } from '@shared/dto';
import { Seat } from '../entities/seat.entity';

export class PaginateSeatResponse extends PaginationResponse {
  @ApiProperty({ type: [Seat] })
  data: Seat[];
}
