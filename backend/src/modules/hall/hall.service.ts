import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateHallDto } from './dto/create-hall.dto';
import { UpdateHallDto } from './dto/update-hall.dto';
import { Hall } from './entities/hall.entity';

@Injectable()
export class HallService {
  constructor(
    @InjectRepository(Hall) private readonly repository: Repository<Hall>,
  ) {}

  async create(dto: CreateHallDto): Promise<Hall> {
    const hall = this.repository.create(dto);
    return await this.repository.save(hall);
  }

  async findAll(query: PaginateQuery, url: string): Promise<Paginated<Hall>> {
    return paginate(query, this.repository, {
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      filterableColumns: {
        name: [FilterOperator.EQ],
        rows: [FilterOperator.LTE, FilterOperator.GTE, FilterOperator.EQ],
      },
      origin: url,
    });
  }

  async findOne(id: string): Promise<Hall> {
    const hall = await this.repository.findOne({ where: { id } });

    if (!hall) throw new NotFoundException();

    return hall;
  }

  async update(id: string, dto: UpdateHallDto) {
    const hall = await this.findOne(id);

    Object.assign(hall, dto);

    return await this.repository.save(hall);
  }

  async remove(id: string) {
    await this.exists(id);
    return await this.repository.softDelete({ id });
  }

  private async exists(id: string) {
    const exists = await this.repository.exists({ where: { id } });

    if (!exists) throw new NotFoundException();
  }
}
