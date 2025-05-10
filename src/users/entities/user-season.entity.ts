import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { Season } from '../../seasons/entities/season.entity';

@Entity()
@Unique(['user', 'season'])
export class UserSeason {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.userSeasons, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Season, (season) => season.userSeasons, {
    onDelete: 'CASCADE',
  })
  season: Season;

  @Column({ type: 'int', default: 0 })
  votesUsed: number;
}
