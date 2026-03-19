import { Hall } from '@core/hall/entities/hall.entity';
import { BaseApplicationEntity } from '@shared/abstracts';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

@Entity()
@Index(['hallId', 'row', 'number'], { unique: true })
export class Seat extends BaseApplicationEntity {
  @Column()
  row: number;

  @Column()
  number: number;

  @Column({ default: false })
  isVip: boolean;

  @ManyToOne(() => Hall, (hall) => hall.seats, { onDelete: 'CASCADE' })
  hall: Hall;

  @Column()
  hallId: string;
}
