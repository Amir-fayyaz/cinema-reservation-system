import { Address } from '@core/address/entities/address.entity';
import { User } from '@core/auth/entities/user.entity';
import { Personnel } from '@core/personnel/entities/personnel.entity';
import { BaseApplicationEntity } from '@shared/abstracts';
import { CinemaStatus } from '@shared/enums';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Cinema extends BaseApplicationEntity {
  @Column()
  @Index()
  name: string;

  @Column({ unique: true })
  phone: string;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  @JoinColumn({ name: 'ownerId' })
  user: User;

  @Column()
  ownerId: string;

  @ManyToOne(() => Address, (address) => address.id, { cascade: true })
  address: Address;

  @Column()
  addressId: string;

  @Column({ type: 'enum', enum: CinemaStatus, default: CinemaStatus.PENDING })
  status: CinemaStatus;

  @OneToMany(() => Personnel, (personnel) => personnel.cinema)
  personnels: Personnel[];
}
