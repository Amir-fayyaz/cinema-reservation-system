import { BaseApplicationEntity } from '@shared/abstracts/base-entity';
import { GenderEnum } from '@shared/enums/gender.enum';
import { ApplicationRoles } from '@shared/enums/role-app.enum';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class User extends BaseApplicationEntity {
  @Column({ length: 100 })
  @Index()
  fullName: string;

  @Column({ length: 11, unique: true })
  phone: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ApplicationRoles,
    default: ApplicationRoles.USER,
  })
  role: ApplicationRoles;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: GenderEnum,
    nullable: true,
  })
  gender: GenderEnum;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;
}
