import { BaseApplicationEntity } from '@shared/abstracts';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class Movie extends BaseApplicationEntity {
  @Column()
  @Index()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column()
  duration: number;

  @Column('date')
  releaseDate: Date;

  @Column({ nullable: true })
  fileId: string; //TODO relation to file-entity
}
