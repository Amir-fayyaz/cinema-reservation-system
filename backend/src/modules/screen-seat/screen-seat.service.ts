import { Injectable } from '@nestjs/common';
import { ScreenSeatRepository } from './screen-seat.repository';

@Injectable()
export class ScreenSeatService {
  constructor(private readonly repo: ScreenSeatRepository) {}
}
