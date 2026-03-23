import { Controller } from '@nestjs/common';
import { ScreenSeatService } from './screen-seat.service';

@Controller('screen-seats')
export class ScreenSeatController {
  constructor(private readonly service: ScreenSeatService) {}
}
