import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private readonly repository: Repository<Position>,
  ) {}

  async create(dto: CreatePositionDto): Promise<Position> {
    const position = this.repository.create(dto);
    return await this.repository.save(position);
  }

  async findAll(): Promise<Position[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<Position> {
    const position = await this.repository.findOne({ where: { id } });

    if (!position) throw new NotFoundException();

    return position;
  }

  async update(id: string, dto: UpdatePositionDto) {
    const position = await this.findOne(id);

    Object.assign(position, dto);

    return await this.repository.save(position);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.repository.softDelete({ id });
  }
}
