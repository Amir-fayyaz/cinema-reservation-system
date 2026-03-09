import { User } from '@core/auth/entities/user.entity';
import { Cinema } from '@core/cinema/entities/cinema.entity';
import { BaseApplicationEntity } from '@shared/abstracts';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Personnel extends BaseApplicationEntity {
  @Column({ type: 'double', nullable: true })
  salary: number;

  @Column({ nullable: true })
  resume: string;

  @Column({ unique: true })
  personnelNumber: string;

  @ManyToOne(() => User, (user) => user.personnels, { cascade: true })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Cinema, (cinema) => cinema.personnels, { cascade: true })
  cinema: Cinema;

  @Column()
  cinemaId: string;
}
