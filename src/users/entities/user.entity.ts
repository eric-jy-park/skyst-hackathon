import { BaseEntity } from 'src/common/entities/base.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import { UserSeason } from './user-season.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @OneToMany(() => UserSeason, (userSeason) => userSeason.user)
  userSeasons: UserSeason[];
}
