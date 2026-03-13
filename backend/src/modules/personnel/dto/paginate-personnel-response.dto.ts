import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponse } from '@shared/dto';
import { Personnel } from '../entities/personnel.entity';

export class PaginatePersonnelResponse extends PaginationResponse {
  @ApiProperty({ type: [Personnel] })
  data: Personnel[];
}
