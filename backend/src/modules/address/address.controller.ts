import { Body, Controller, Post } from '@nestjs/common';
import { AuthorizeByRole } from '@shared/decorators';
import { ApplicationRoles } from '@shared/enums';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Post()
  @AuthorizeByRole([
    ApplicationRoles.CINEMA_OWNER,
    ApplicationRoles.CINEMA_ADMIN,
  ])
  async create(@Body() dto: CreateAddressDto) {
    return await this.service.create(dto);
  }
}
