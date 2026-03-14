import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { DeleteResult, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie) private readonly repository: Repository<Movie>,
  ) {}

  async create(dto: CreateMovieDto): Promise<Movie> {
    const movie = this.repository.create(dto);
    return await this.repository.save(movie);
  }

  async findAll(query: PaginateQuery, url: string): Promise<Paginated<Movie>> {
    return paginate(query, this.repository, {
      sortableColumns: ['createdAt', 'releaseDate'],
      defaultSortBy: [['createdAt', 'DESC']],
      //TODO add relation to File entity
      filterableColumns: {
        name: [FilterOperator.EQ, FilterOperator.ILIKE],
        duration: [FilterOperator.GTE, FilterOperator.EQ, FilterOperator.LTE],
        releaseDate: [FilterOperator.EQ],
      },
      origin: url,
    });
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.repository.findOne({ where: { id } });

    if (!movie) throw new NotFoundException();

    return movie;
  }

  async update(id: string, dto: UpdateMovieDto) {
    const movie = await this.findOne(id);

    Object.assign(movie, dto);

    return await this.repository.save(movie);
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.exists(id);
    return await this.repository.softDelete({ id });
  }

  private async exists(id: string): Promise<void> {
    const res = await this.repository.exists({ where: { id } });

    if (!res) throw new NotFoundException();
  }
}
