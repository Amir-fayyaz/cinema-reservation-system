import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { Screening } from './entities/screening.entity';
import { ScreeningRepository } from './screening.repository';

@Injectable()
export class ScreeningService {
  constructor(private readonly repository: ScreeningRepository) {}

  async create(dto: CreateScreeningDto) {
    const queryRunner: QueryRunner =
      await this.repository.startTransaction('READ COMMITTED');

    try {
      const screeningToSave: Screening = queryRunner.manager.create(
        Screening,
        dto,
      );

      const isStartTimeInPast: boolean = await this.repository
        .isStartTimeInPast()
        .getBuilder()
        .getExists();

      if (isStartTimeInPast) {
        throw new BadRequestException('Start time must be in the future');
      }

      const isMovieNotReleased: boolean = await this.repository
        .isMovieNotReleased()
        .getBuilder()
        .getExists();

      if (isMovieNotReleased) {
        throw new BadRequestException('Movie has not been released yet');
      }

      const hasConflict: boolean = await this.repository.hasTimeConflict(
        queryRunner,
        screeningToSave.hallId,
        screeningToSave.startTime,
        screeningToSave.movieId,
      );

      if (hasConflict) {
        throw new ConflictException(
          'Hall is already booked for this time slot',
        );
      }

      const screening: Screening =
        await queryRunner.manager.save(screeningToSave);

      await queryRunner.commitTransaction();

      return screening;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error.message);
    } finally {
      await queryRunner.release();
    }
  }
}
