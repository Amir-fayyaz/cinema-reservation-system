import { BaseApplicationEntity } from '@shared/abstracts/base-entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Permission extends BaseApplicationEntity {
  @Column()
  @Index()
  name: string;

  @ManyToOne(() => User, (user) => user.permissions)
  user: User;

  @Column()
  userId: string;
}
