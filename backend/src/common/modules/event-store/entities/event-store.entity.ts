import { BaseApplicationEntity } from '@shared/abstracts/base-entity';
import { Column, Entity, Index } from 'typeorm';
import { IEventStoreMetadata } from '../dto/eventStore-metadata';

@Entity('event_store')
export class EventStore extends BaseApplicationEntity {
  @Column({ nullable: true })
  @Index()
  aggregateId?: string;

  @Column({ nullable: true })
  @Index()
  aggregateType?: string;

  @Column({ nullable: true })
  @Index()
  eventType?: string;

  @Column()
  eventVersion: number;

  @Column({ type: 'json', nullable: true })
  data?: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  metadata?: IEventStoreMetadata;
}
