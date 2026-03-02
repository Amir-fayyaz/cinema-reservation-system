import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserEvents } from '@shared/constants/events/user.events';
import { EventStoreService } from '@shared/modules/event-store/services/event-store.repository';

@Injectable()
export class UserEventListener {
  constructor(private readonly eventStoreService: EventStoreService) {}

  @OnEvent(UserEvents.CREATE_USER)
  async create({ aggregateId }) {}
}
