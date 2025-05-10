import { Band } from 'src/bands/entities/band.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Season } from 'src/seasons/entities/season.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['band', 'season'])
export class Video extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  album_image: string;

  @Column()
  song_description: string;

  @OneToMany(() => Vote, (vote) => vote.video)
  votes: Vote[];

  @ManyToOne(() => Season, (season) => season.videos)
  season: Season;

  @ManyToOne(() => Band, (band) => band.videos)
  band: Band;
}
