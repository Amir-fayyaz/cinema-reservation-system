import { BaseApplicationEntity } from '@shared/abstracts/base-entity';
import { Column, Index, ManyToOne } from 'typeorm';
import { User } from './user.entity';

export class Permission extends BaseApplicationEntity {
  @Column()
  @Index()
  name: string;

  @ManyToOne(() => User, (user) => user.permissions)
  user: User;

  @Column()
  userId: string;
}
