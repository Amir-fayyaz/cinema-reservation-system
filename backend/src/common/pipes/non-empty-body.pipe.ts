import {
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class NotEmptyBodyPipe implements PipeTransform {
  private readonly logger = new Logger(NotEmptyBodyPipe.name);

  transform(value: unknown) {
    if (value === null || value === undefined) {
      throw new BadRequestException('Request body cannot be empty');
    }

    if (typeof value === 'string' && value.trim().length === 0) {
      throw new BadRequestException('Request body cannot be empty');
    }

    if (typeof value !== 'object' || Array.isArray(value)) {
      this.logger.warn(`Unexpected body type received: ${typeof value}`);
      throw new BadRequestException('Request body must be a JSON object');
    }

    if (Object.keys(value).length === 0) {
      throw new BadRequestException('Request body cannot be empty');
    }

    const hasValidValue = Object.values(value).some(
      (val) => val !== undefined && val !== null,
    );

    if (!hasValidValue) {
      throw new BadRequestException(
        'Request body must contain at least one valid field',
      );
    }

    return value;
  }
}
