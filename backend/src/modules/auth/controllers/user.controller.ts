import { Body, Controller, Post } from '@nestjs/common';
import { CREATE_USER } from '@shared/constants';
import { AuthorizeByPermission } from '@shared/decorators';
import { CreateUserDto } from '../dto';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @AuthorizeByPermission([CREATE_USER])
  async create(@Body() dto: CreateUserDto) {
    return await this.service.create(dto);
  }
}
