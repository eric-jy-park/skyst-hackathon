import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Season {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  season_no: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;
}
