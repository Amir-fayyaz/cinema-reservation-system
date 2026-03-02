import { BaseApplicationEntity } from '@shared/abstracts';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { PermissionCategory } from './permission-category.entity';
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

  @ManyToOne(() => PermissionCategory, (pc) => pc.permissions)
  @JoinColumn({ name: 'categoryId' })
  category: PermissionCategory;

  @Column()
  categoryId: string;
}
