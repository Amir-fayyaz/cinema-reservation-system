import { BadRequestException, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthEvents } from '@shared/constants/events/auth.events';
import { AppAggregateTypes } from '@shared/enums/aggregate-type.enum';
import { EventStoreService } from '@shared/modules/event-store/services/event-store.repository';

@Injectable()
export class AuthEventListener {
  constructor(private readonly eventStoreService: EventStoreService) {}

  @OnEvent(AuthEvents.REGISTER_BY_EMAIL)
  /**
   * @param aggregateId => who emit this event ? (90 percent is userId)
   * @param email => with which email emit this event
   * @param message => what happened in this event
   */
  async registerByEmail({ aggregateId, email, message }): Promise<void> {
    try {
      await this.eventStoreService.create({
        aggregateId: aggregateId || '',
        aggregateType: AppAggregateTypes.AUTH,
        eventType: AuthEvents.REGISTER_BY_EMAIL,
        data: { email, message: message || '' },
        eventVersion: 1,
        metadata: { timestamp: new Date(), userId: aggregateId },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @OnEvent(AuthEvents.LOGIN_BY_EMAIL)
  /**
   * @param  aggregateId => who emit this event ? (90 percent is userId)
   * @param email => with which email emit this event
   * @param message => what happened in this event
   * @param @optional otpCode => what otpCode entered by user
   */
  async verifyByEmail({
    aggregateId,
    data,
    message,
    otpCode,
    email,
  }): Promise<void> {
    try {
      await this.eventStoreService.create({
        aggregateId,
        eventType: AuthEvents.LOGIN_BY_EMAIL,
        aggregateType: AppAggregateTypes.AUTH,
        data: { email, message, otpCode, ...data },
        eventVersion: 1,
        metadata: { timestamp: new Date(), userId: aggregateId },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
