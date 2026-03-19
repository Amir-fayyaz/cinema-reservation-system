import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Screening } from './entities/screening.entity';

@Injectable()
export class ScreeningService {
  constructor(
    @InjectRepository(Screening)
    private readonly repository: Repository<Screening>,
  ) {}
}
