import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserSeason } from 'src/users/entities/user-season.entity';
import { Video } from 'src/videos/entities/video.entity';

@Entity()
export class Season extends BaseEntity {
  @ApiProperty({
    description: 'The unique identifier of the season',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The number of the season',
    example: 1,
  })
  @Column()
  season_no: number;

  @ApiProperty({
    description: 'The start date of the season',
    example: '2024-01-01T00:00:00.000Z',
  })
  @Column()
  start_date: Date;

  @ApiProperty({
    description: 'The end date of the season (optional)',
    example: '2024-12-31T23:59:59.000Z',
    required: false,
  })
  @Column({ nullable: true })
  end_date?: Date;

  @ApiProperty({
    description: 'The number of votes a user can cast in this season',
    example: 3,
  })
  @Column({ default: 3 })
  voteLimit: number;

  @ApiProperty({
    description: 'The users who have cast votes in this season',
    type: () => UserSeason,
  })
  @OneToMany(() => UserSeason, (userSeason) => userSeason.season)
  userSeasons: UserSeason[];

  @ApiProperty({
    description: 'The videos in this season',
    type: () => Video,
  })
  @OneToMany(() => Video, (video) => video.season)
  videos: Video[];
}
