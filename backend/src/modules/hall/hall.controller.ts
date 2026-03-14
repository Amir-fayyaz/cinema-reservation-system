import { Controller } from '@nestjs/common';
import { HallService } from './hall.service';

@Controller('hall')
export class HallController {
  constructor(private readonly service: HallService) {}
}
