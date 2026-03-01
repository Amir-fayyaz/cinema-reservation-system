import { BaseApplicationEntity } from '@shared/abstracts/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Permission } from './permission.entity';

@Entity()
export class PermissionCategory extends BaseApplicationEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Permission, (p) => p.category)
  permissions: Permission[];
}
