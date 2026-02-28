import { BadRequestException, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthEvents } from '@shared/constants/events/auth.events';
import { AppAggregateTypes } from '@shared/enums/aggregate-type.enum';
import { EventStoreService } from '@shared/modules/event-store/services/event-store.repository';

@Injectable()
export class AuthEventListener {
  constructor(private readonly eventStoreService: EventStoreService) {}

  @OnEvent(AuthEvents.REGISTER_BY_EMAIL)
  async registerByEmail({ aggregateId, email, message }): Promise<void> {
    try {
      await this.eventStoreService.create({
        aggregateId: aggregateId || '',
        aggregateType: AppAggregateTypes.AUTH,
        eventType: AuthEvents.REGISTER_BY_EMAIL,
        data: { email, message: message || '' },
        eventVersion: 1,
        metadata: {},
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
