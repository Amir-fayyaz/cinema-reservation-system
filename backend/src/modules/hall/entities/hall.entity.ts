import { BaseApplicationEntity } from '@shared/abstracts';
import { Column, Entity } from 'typeorm';

@Entity()
export class Hall extends BaseApplicationEntity {
  @Column()
  name: string;

  @Column()
  rows: number;

  @Column()
  seatsPerRows: number;
}
