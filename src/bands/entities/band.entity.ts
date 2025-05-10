import { ApiProperty } from '@nestjs/swagger';
import { Video } from 'src/videos/entities/video.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Band extends BaseEntity {
  @ApiProperty({
    description: 'The unique identifier of the band',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The name of the band',
    example: 'Band Name',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The image of the band',
    example: 'https://example.com/band-image.jpg',
  })
  @Column()
  image: string;

  @ApiProperty({
    description: 'The description of the band',
    example: 'This is a band description',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'The videos associated with the band',
    example: [],
  })
  @OneToMany(() => Video, (video) => video.band)
  videos: Video[];
}
