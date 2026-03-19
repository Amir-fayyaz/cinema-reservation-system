import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Seat } from './entities/seat.entity';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private readonly repository: Repository<Seat>,
  ) {}

  async create(dto: CreateSeatDto): Promise<Seat> {
    const seat = await this.repository.exists({
      where: { hallId: dto.hallId, row: dto.row, number: dto.number },
    });

    if (seat) {
      throw new BadRequestException(
        `Seat row ${dto.row}, number ${dto.number} already exists in this hall`,
      );
    }
    const newSeat = this.repository.create(dto);
    return await this.repository.save(newSeat);
  }

  async findAll(query: PaginateQuery, url: string): Promise<Paginated<Seat>> {
    return paginate(query, this.repository, {
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      relations: ['hall'],
      select: [
        'id',
        'createdAt',
        'row',
        'number',
        'isVip',
        'hallId',
        'hall.name',
        'hall.rows',
        'hall.seatsPerRows',
      ],
      filterableColumns: {
        hallId: [FilterOperator.EQ],
        row: [FilterOperator.EQ],
        number: [FilterOperator.EQ],
        isVip: [FilterOperator.EQ],
      },
      origin: url,
    });
  }

  async findOne(id: string): Promise<Seat> {
    const seat = await this.repository.findOne({
      where: { id },
      relations: ['hall'],
    });

    if (!seat) throw new NotFoundException();

    return seat;
  }

  async update(id: string, dto: UpdateSeatDto) {
    const seat = await this.findOne(id);

    if (dto.row || dto.number || dto.hallId) {
      const exists = await this.repository.exists({
        where: {
          hallId: dto.hallId ?? seat.hallId,
          row: dto.row ?? seat.row,
          number: dto.number ?? seat.number,
        },
      });

      if (exists) {
        throw new BadRequestException('Seat with these details already exists');
      }
    }

    Object.assign(seat, dto);
    return await this.repository.save(seat);
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
