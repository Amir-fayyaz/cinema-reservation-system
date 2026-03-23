import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FilterOperator, paginate, PaginateQuery } from 'nestjs-paginate';
import { QueryRunner } from 'typeorm';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { UpdateScreeningDto } from './dto/update-screening.dto';
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

  async findAll(query: PaginateQuery, url: string) {
    return paginate(query, this.repository, {
      sortableColumns: ['startTime', 'createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      relations: ['hall', 'movie'],
      select: [
        'id',
        'createdAt',
        'basePrice',
        'status',
        'startTime',
        'movie.id',
        'movie.name',
        'movie.description',
        'movie.duration',
        'movie.releaseDate',
        'movie.fileId', // relation to file
        'hall.id',
        'hall.name',
        'hall.rows',
        'hall.seatsPerRows',
      ],
      filterableColumns: {
        status: [FilterOperator.EQ],
        startTime: [FilterOperator.LTE, FilterOperator.EQ, FilterOperator.GTE],
        'movie.id': [FilterOperator.EQ],
        'hall.id': [FilterOperator.EQ],
        'movie.name': [FilterOperator.ILIKE],
      },
      origin: url,
    });
  }

  async findOne(id: string): Promise<Screening> {
    const screening = await this.repository.findOne({
      where: { id },
      relations: ['hall', 'movie'],
      select: {
        id: true,
        createdAt: true,
        basePrice: true,
        startTime: true,
        status: true,
        movie: {
          id: true,
          name: true,
          description: true,
          duration: true,
          releaseDate: true,
          fileId: true, //relation to file-entity
        },
        hall: {
          id: true,
          name: true,
          rows: true,
          seatsPerRows: true,
        },
      },
    });

    if (!screening) throw new NotFoundException();

    return screening;
  }

  async update(id: string, dto: UpdateScreeningDto) {
    const queryRunner: QueryRunner =
      await this.repository.startTransaction('READ COMMITTED');

    try {
      const existing = await this.repository
        .findById(queryRunner, id)
        .findOneScreening();

      if (!existing) {
        throw new NotFoundException('Screening not found');
      }
      const updated = queryRunner.manager.merge(Screening, existing, dto);

      if (dto.startTime) {
        const isStartTimeInPast = await this.repository
          .isStartTimeInPast()
          .getBuilder()
          .getExists();

        if (isStartTimeInPast) {
          throw new BadRequestException('Start time must be in the future');
        }
      }

      if (dto.movieId || dto.startTime) {
        const isMovieNotReleased = await this.repository
          .isMovieNotReleased()
          .getBuilder()
          .getExists();

        if (isMovieNotReleased) {
          throw new BadRequestException('Movie has not been released yet');
        }
      }

      if (dto.hallId || dto.startTime || dto.movieId) {
        const hasConflict = await this.repository.hasTimeConflict(
          queryRunner,
          updated.hallId ?? existing.hallId,
          updated.startTime ?? existing.startTime,
          updated.movieId ?? existing.movieId,
          id,
        );

        if (hasConflict) {
          throw new ConflictException(
            'Hall is already booked for this time slot',
          );
        }
      }

      const screening = await queryRunner.manager.save(updated);

      await queryRunner.commitTransaction();

      return screening;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async changeStatus() {}

  //TODO add remove service when finished reservation & payment modules

  private async exists(id: string) {
    const s = await this.repository.exists({ where: { id } });

    if (!s) throw new NotFoundException('screening not found');
  }
}
