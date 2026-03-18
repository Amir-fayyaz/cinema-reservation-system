import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSeatDto } from './dto/create-seat.dto';
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

    if (seat) throw new BadRequestException('Seat already exists');

    const newSeat = this.repository.create(dto);
    return await this.repository.save(newSeat);
  }
}
