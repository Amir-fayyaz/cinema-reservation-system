import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { Cinema } from './entities/cinema.entity';

@Injectable()
export class CinemaService {
  constructor(
    @InjectRepository(Cinema)
    private readonly repository: Repository<Cinema>,
  ) {}

  async create(dto: CreateCinemaDto): Promise<Cinema> {
    const newCinema = this.repository.create(dto);
    return await this.repository.save(newCinema);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Cinema>> {
    return paginate(query, this.repository, {
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      relations: ['user', 'address'],
      select: [
        'name',
        'phone',
        'status',
        'createdAt',
        'address.city',
        'address.province',
        'address.fullAddress',
        'address.latitude',
        'address.longitude',
        'user.fullName',
        'user.phone',
        'user.gender',
      ],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterOperator.ILIKE],
        status: [FilterOperator.EQ],
        'address.city': [FilterOperator.EQ],
        'address.province': [FilterOperator.EQ],
        'address.latitude': [FilterOperator.EQ],
        'address.longitude': [FilterOperator.EQ],
      },
    });
  }

  async findOne(id: string): Promise<Cinema> {
    const cinema = await this.repository.findOne({ where: { id } });

    if (!cinema) throw new NotFoundException();

    return cinema;
  }

  async update(id: string, dto: UpdateCinemaDto) {
    const cinema = await this.findOne(id);

    Object.assign(cinema, dto);

    return await this.repository.save(cinema);
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.findOne(id);

    return await this.repository.softDelete({ id });
  }
}
