import { BaseApplicationEntity } from '@shared/abstracts';
import { Column, Entity } from 'typeorm';

@Entity()
export class Position extends BaseApplicationEntity {
  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}
