import { IEventStoreMetadata } from './eventStore-metadata';

export class CreateEventDto {
  aggregateId?: string;
  aggregateType?: string;
  eventType?: string;
  eventVersion: number = 1;
  data?: Record<string, any>;
  metadata?: IEventStoreMetadata;
}
