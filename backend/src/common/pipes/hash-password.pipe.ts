import { Injectable, PipeTransform } from '@nestjs/common';
import { Hash } from '@shared/utils/hash';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(value: any) {
    if (value.password) value.password = await Hash(value.password);

    return value;
  }
}
