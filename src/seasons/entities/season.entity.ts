import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Season {
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
}
