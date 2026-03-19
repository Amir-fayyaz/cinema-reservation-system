import { Seat } from '@core/seat/entities/seat.entity';
import { BaseApplicationEntity } from '@shared/abstracts';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Hall extends BaseApplicationEntity {
  @Column()
  name: string;

  @Column()
  rows: number;

  @Column()
  seatsPerRows: number;

  @OneToMany(() => Seat, (seat) => seat.hall)
  seats: Seat[];
}
