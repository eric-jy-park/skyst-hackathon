import { User } from 'src/users/entities/user.entity';
import { Video } from 'src/videos/entities/video.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['user', 'video'])
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  count: number;

  @Column({ nullable: true })
  comment: string;

  @ManyToOne(() => User, (user) => user.votes)
  user: User;

  @ManyToOne(() => Video, (video) => video.votes)
  video: Video;
}
