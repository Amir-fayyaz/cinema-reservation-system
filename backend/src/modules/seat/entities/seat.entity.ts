import { BaseApplicationEntity } from '@shared/abstracts';
import { Entity } from 'typeorm';

@Entity()
export class Seat extends BaseApplicationEntity {}
