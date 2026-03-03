import { BaseApplicationEntity } from '@shared/abstracts';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class Address extends BaseApplicationEntity {
  @Column()
  province: string;

  @Column()
  city: string;

  @Column()
  @Index()
  fullAddress: string;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;
}
