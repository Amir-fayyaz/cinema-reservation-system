import { Controller } from '@nestjs/common';

@Controller('personnel')
export class PersonnelController {
  constructor(private readonly service: any) {}
}
