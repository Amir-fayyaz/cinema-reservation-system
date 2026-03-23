import { Hall } from '@core/hall/entities/hall.entity';
import { Movie } from '@core/movie/entities/movie.entity';
import { ScreenSeat } from '@core/screen-seat/entities/screen-seat.entity';
import { BaseApplicationEntity } from '@shared/abstracts';
import { ScreeningStatus } from '@shared/enums';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Screening extends BaseApplicationEntity {
  @Column('timestamp')
  startTime: Date;

  @Column()
  basePrice: number;

  @Column({
    type: 'enum',
    enum: ScreeningStatus,
    default: ScreeningStatus.ACTIVE,
  })
  status: ScreeningStatus;

  @ManyToOne(() => Movie, (movie) => movie.screenings, { cascade: true })
  movie: Movie;

  @Column()
  movieId: string;

  @ManyToOne(() => Hall, (hall) => hall.screenings, { cascade: true })
  hall: Hall;

  @Column()
  hallId: string;

  @OneToMany(() => ScreenSeat, (s) => s.screening, { onDelete: 'CASCADE' })
  screeningSeats: ScreenSeat[];
}
