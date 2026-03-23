import { Controller } from '@nestjs/common';
import { DiscountService } from './discount.service';

@Controller('discounts')
export class DiscountController {
  constructor(private readonly service: DiscountService) {}
}
