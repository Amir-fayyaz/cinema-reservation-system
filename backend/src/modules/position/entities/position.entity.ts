import { Personnel } from '@core/personnel/entities/personnel.entity';
import { BaseApplicationEntity } from '@shared/abstracts';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Position extends BaseApplicationEntity {
  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Personnel, (p) => p.position)
  personnels: Personnel[];
}
