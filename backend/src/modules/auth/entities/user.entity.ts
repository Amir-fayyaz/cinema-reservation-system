import { ScreenSeat } from '@core/screen-seat/entities/screen-seat.entity';
import { BaseApplicationEntity } from '@shared/abstracts';
import { ApplicationRoles, GenderEnum } from '@shared/enums';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Permission } from './permission.entity';

@Entity()
export class User extends BaseApplicationEntity {
  @Column({ length: 100, nullable: true })
  @Index()
  fullName?: string;

  @Column({ length: 11, unique: true, nullable: true })
  phone?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({
    type: 'enum',
    enum: ApplicationRoles,
    default: ApplicationRoles.USER,
  })
  role: ApplicationRoles;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({
    type: 'enum',
    enum: GenderEnum,
    nullable: true,
  })
  gender: GenderEnum;

  @Column({ type: 'date', nullable: true })
  birthDate?: Date;

  @Column({ nullable: true })
  refreshToken?: string;

  @OneToMany(() => Permission, (permission) => permission.user)
  permissions: Permission[];

  @OneToMany(() => ScreenSeat, (s) => s.seat, { onDelete: 'CASCADE' })
  screenSeats: ScreenSeat[];
}
