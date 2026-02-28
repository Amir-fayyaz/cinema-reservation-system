import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventStore } from './entities/event-store.entity';
import { EventStoreService } from './services/event-store.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([EventStore])],
  providers: [EventStoreService],
  exports: [EventStoreService],
})
export class EventStoreModule {}
