import { Hall } from '@core/hall/entities/hall.entity';
import { BaseApplicationEntity } from '@shared/abstracts';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Seat extends BaseApplicationEntity {
  @Column()
  row: number;

  @Column()
  number: number;

  @Column({ default: false })
  isVip: boolean;

  @ManyToOne(() => Hall, (hall) => hall.seats, { cascade: true })
  Hall: Hall;

  @Column()
  hallId: string;
}
