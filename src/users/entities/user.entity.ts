import { BaseEntity } from 'src/common/entities/base.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import { UserSeason } from './user-season.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';

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

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Vote, (vote) => vote.user, { eager: true })
  votes: Vote[];

  @OneToMany(() => UserSeason, (userSeason) => userSeason.user, { eager: true })
  userSeasons: UserSeason[];

  @OneToMany(() => Comment, (comment) => comment.user, { eager: true })
  comments: Comment[];
}
