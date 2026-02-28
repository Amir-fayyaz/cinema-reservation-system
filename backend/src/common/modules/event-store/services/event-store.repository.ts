import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventStore } from '../entities/event-store.entity';

export class EventStoreService {
  constructor(
    @InjectRepository(EventStore)
    private readonly repository: Repository<EventStore>,
  ) {}

  async create(dto: CreateEventDto) {
    try {
      const newEvent = this.repository.create(dto);
      return await this.repository.save(newEvent);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
