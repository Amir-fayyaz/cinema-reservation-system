import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('/health')
  async health() {
    return { message: 'every thing is okay' };
  }
}
