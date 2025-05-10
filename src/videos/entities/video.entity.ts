import { ApiProperty } from '@nestjs/swagger';
import { Band } from 'src/bands/entities/band.entity';
import { Comment } from 'src/comments/entities/comment.entity';
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
  @ApiProperty({
    description: 'The unique identifier of the video',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The URL of the video',
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  })
  @Column()
  url: string;

  @ApiProperty({
    description: 'The song title of the video',
    example: 'Song Title',
  })
  @Column({ nullable: true })
  song_title: string;

  @ApiProperty({
    description: 'The song description of the video',
    example: 'This is a song description',
  })
  @Column()
  song_description: string;

  @ApiProperty({
    description: 'The album cover of the video',
    example: 'https://example.com/album-cover.jpg',
  })
  @Column()
  album_cover: string;

  @ApiProperty({
    description: 'The votes of the video',
    example: [],
  })
  @OneToMany(() => Vote, (vote) => vote.video, { eager: true })
  votes: Vote[];

  @ApiProperty({
    description: 'The season of the video',
    example: {
      id: 'season-uuid-example-1234',
      season_no: 1,
      start_date: '2024-01-01T00:00:00.000Z',
      end_date: '2024-12-31T23:59:59.000Z',
      voteLimit: 100,
      stage: 'preliminary',
      videos: [],
    },
    type: () => Season,
  })
  @ManyToOne(() => Season, (season) => season.videos, { eager: true })
  season: Season;

  @ApiProperty({
    description: 'The band of the video',
    example: {
      id: 'band-uuid-example-5678',
      name: 'Band Name',
      description: 'This is a band description',
      image: 'https://example.com/band-image.jpg',
      videos: [],
    },
    type: () => Band,
  })
  @ManyToOne(() => Band, (band) => band.videos, { eager: true })
  band: Band;

  @ApiProperty({
    description: 'The comments of the video',
    example: [],
  })
  @OneToMany(() => Comment, (comment) => comment.video, { eager: true })
  comments: Comment[];
}
