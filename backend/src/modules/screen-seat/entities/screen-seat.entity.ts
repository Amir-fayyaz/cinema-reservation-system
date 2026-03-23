import { User } from '@core/auth/entities/user.entity';
import { Screening } from '@core/screening/entities/screening.entity';
import { Seat } from '@core/seat/entities/seat.entity';
import { BaseApplicationEntity } from '@shared/abstracts';
import { ScreeningSeatStatus } from '@shared/enums';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class ScreenSeat extends BaseApplicationEntity {
  @Column({ type: 'enum', enum: ScreeningSeatStatus })
  status: ScreeningSeatStatus;

  @Column({ nullable: true, type: 'datetime' })
  holdExpireAt: Date;

  @ManyToOne(() => Screening, (s) => s.screeningSeats)
  screening: Screening;

  @Column()
  screeningId: string;

  @ManyToOne(() => Seat, (s) => s.screeningSeats)
  seat: Seat;

  @Column()
  seatId: string;

  @ManyToOne(() => User, (u) => u.screenSeats, { nullable: true })
  user: User;

  @Column({ nullable: true })
  userId: string;
}
