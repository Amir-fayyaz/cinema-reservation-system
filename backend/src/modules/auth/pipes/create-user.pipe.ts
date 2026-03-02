import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../dto';

@Injectable()
export class CreateUserPipe implements PipeTransform {
  transform(dto: CreateUserDto) {
    if (!dto.phone && !dto.email)
      throw new BadRequestException('one of email or phone is required');

    if (dto.phone && dto.password)
      throw new BadRequestException('password should not be exist ');

    if (dto.email && !dto.password)
      throw new BadRequestException('password is required');

    return dto;
  }
}
