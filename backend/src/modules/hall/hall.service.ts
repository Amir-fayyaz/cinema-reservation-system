import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hall } from './entities/hall.entity';

@Injectable()
export class HallService {
  constructor(
    @InjectRepository(Hall) private readonly repository: Repository<Hall>,
  ) {}

  async create() {}
}
