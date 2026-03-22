import { Movie } from '@core/movie/entities/movie.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScreeningStatus } from '@shared/enums';
import {
  DataSource,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';
import { Screening } from './entities/screening.entity';

@Injectable()
export class ScreeningRepository extends Repository<Screening> {
  private selectBuilder: SelectQueryBuilder<Screening>;

  constructor(
    @InjectRepository(Screening)
    private readonly repository: Repository<Screening>,
    private readonly dataSource: DataSource,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async startTransaction(isolationLevel: IsolationLevel): Promise<QueryRunner> {
    const queryRunner = this.dataSource.createQueryRunner();
    this.selectBuilder = queryRunner.manager.createQueryBuilder(
      Screening,
      'screening',
    );
    await queryRunner.connect();
    await queryRunner.startTransaction(isolationLevel);
    return queryRunner;
  }

  getBuilder() {
    return this.selectBuilder;
  }

  activeScreenings() {
    this.selectBuilder.where('screening.status = :status', {
      status: ScreeningStatus.ACTIVE,
    });
    return this;
  }

  hasHallConflict(hallId: string) {
    this.selectBuilder.andWhere('screening.hallId = :hallId', { hallId });
    return this;
  }

  inTimeRange(from: Date, to: Date) {
    this.selectBuilder
      .andWhere('screening.startTime >= :from', { from })
      .andWhere('screening.startTime <= :to', { to });
    return this;
  }

  exclude(id: string) {
    this.selectBuilder.andWhere('screening.id != :id', { id });
    return this;
  }

  withMovieDetails() {
    this.selectBuilder.innerJoinAndSelect('screening.movie', 'movie');
    return this;
  }

  orderByStartTime(order: 'ASC' | 'DESC' = 'ASC') {
    this.selectBuilder.orderBy('screening.startTime', order);
    return this;
  }

  isStartTimeInPast() {
    this.selectBuilder.andWhere('screening.startTime <= NOW()');
    return this;
  }

  isMovieNotReleased() {
    this.selectBuilder
      .innerJoin('screening.movie', 'movie')
      .andWhere('movie.releaseDate > screening.startTime');
    return this;
  }

  isScreeningNotFound(id: string) {
    this.selectBuilder.andWhere('screening.id = :id', { id });
    return this;
  }

  async findScreenings() {
    return this.selectBuilder.getMany();
  }

  async findOneScreening() {
    return this.selectBuilder.getOne();
  }

  async hasTimeConflict(
    queryRunner: QueryRunner,
    hallId: string,
    startTime: Date,
    movieId: string,
    excludeId?: string,
  ): Promise<boolean> {
    const movie = await queryRunner.manager.findOne(Movie, {
      where: { id: movieId },
      select: ['duration'],
    });

    if (!movie) return false;

    const newScreeningEnd = new Date(
      startTime.getTime() + movie.duration * 60 * 1000,
    );

    const qb = queryRunner.manager
      .createQueryBuilder(Screening, 'screening')
      .innerJoin(Movie, 'movie', 'movie.id = screening.movieId')
      .where('screening.hallId = :hallId', { hallId })
      .andWhere('screening.deletedAt IS NULL')
      .andWhere('screening.status = :status', { status: 'active' })
      .andWhere('screening.startTime < :newScreeningEnd', { newScreeningEnd })
      .andWhere(
        'DATE_ADD(screening.startTime, INTERVAL movie.duration MINUTE) > :startTime',
        { startTime },
      );

    if (excludeId) {
      qb.andWhere('screening.id != :excludeId', { excludeId });
    }

    return qb.getExists();
  }
}
