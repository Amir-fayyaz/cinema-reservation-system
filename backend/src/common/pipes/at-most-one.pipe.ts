import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AtMostOne implements PipeTransform {
  fields: string[];

  constructor(fields: string[]) {
    this.fields = fields;
  }

  transform(dto: any) {
    let countOfExistingFields = 0;

    this.fields.forEach((field) => {
      if (dto.hasOwnProperty(field)) {
        countOfExistingFields++;
      }
    });

    if (countOfExistingFields > 1) {
      throw new BadRequestException(
        'just one of ' + this.fields.toString() + ' is ' + 'allowed',
      );
    }

    return dto;
  }
}
