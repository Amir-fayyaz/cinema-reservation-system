export interface IEventStoreMetadata {
  userId?: string;
  correlationId?: string;
  causationId?: string;
  timestamp?: Date;
  source?: string;
}
