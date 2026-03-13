import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  FilterSuffix,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { UpdatePersonnelDto } from './dto/update-personnel.dto';
import { Personnel } from './entities/personnel.entity';

@Injectable()
export class PersonnelService {
  constructor(
    @InjectRepository(Personnel)
    private readonly repository: Repository<Personnel>,
  ) {}

  async create(dto: CreatePersonnelDto): Promise<Personnel> {
    const personnel = this.repository.create(dto);
    return await this.repository.save(personnel);
  }

  async findAll(
    query: PaginateQuery,
    url: string,
  ): Promise<Paginated<Personnel>> {
    return paginate(query, this.repository, {
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      relations: ['position', 'user'],
      select: [
        'id',
        'createdAt',
        'position.name',
        'user.birthDate',
        'user.fullName',
        'user.email',
        'user.phone',
        'personnelNumber',
      ],
      filterableColumns: {
        personnelNumber: [
          FilterOperator.EQ,
          FilterSuffix.NOT,
          FilterOperator.ILIKE,
        ],
        'position.name': [
          FilterOperator.EQ,
          FilterSuffix.NOT,
          FilterOperator.ILIKE,
        ],
      },
      origin: url,
    });
  }

  async findOne(id: string): Promise<Personnel> {
    const personnel = await this.repository.findOne({
      where: { id },
      relations: { position: true, user: true },
    });

    if (!personnel) throw new NotFoundException();

    return personnel;
  }

  async update(id: string, dto: UpdatePersonnelDto) {
    const personnel = await this.findOne(id);

    Object.assign(personnel, dto);

    return await this.repository.save(personnel);
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.findOne(id);

    return await this.repository.softDelete({ id });
  }
}
