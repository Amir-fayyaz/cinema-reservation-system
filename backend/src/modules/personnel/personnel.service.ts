import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
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
}
