import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const newUser = this.repository.create(dto);
    return await this.repository.save(newUser);
  }

  async findAll(query: PaginateQuery, url: string): Promise<Paginated<User>> {
    return paginate(query, this.repository, {
      sortableColumns: ['createdAt', 'birthDate'],
      defaultSortBy: [['createdAt', 'DESC']],
      select: [
        'id',
        'createdAt',
        'phone',
        'email',
        'fullName',
        'role',
        'gender',
        'birthDate',
      ],
      filterableColumns: {
        gender: [FilterOperator.EQ],
        birthDate: [FilterOperator.EQ],
        role: [FilterOperator.EQ],
      },
      origin: url,
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) throw new NotFoundException();

    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, dto);

    return await this.repository.save(user);
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.repository.softDelete({ id });
  }
}
