import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCinemaDto } from './dto/create-cinema.dto';
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
}
