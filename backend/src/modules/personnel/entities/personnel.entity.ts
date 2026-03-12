import { User } from '@core/auth/entities/user.entity';
import { Position } from '@core/position/entities/position.entity';
import { BaseApplicationEntity } from '@shared/abstracts';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Personnel extends BaseApplicationEntity {
  @Column({ type: 'double' })
  salary: number;

  @Column({ nullable: true })
  resume: string;

  @Column({ unique: true })
  personnelNumber: string;

  @OneToOne(() => User, { cascade: true, nullable: false })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Position, (p) => p.personnels, { cascade: true })
  position: Position;

  @Column()
  positionId: string;
}
