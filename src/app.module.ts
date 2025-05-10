import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonsModule } from './seasons/seasons.module';
import { BandsModule } from './bands/bands.module';
import { VideosModule } from './videos/videos.module';
import { UsersModule } from './users/users.module';
import { VotesModule } from './votes/votes.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || '',
      port: 5432,
      username: process.env.USERNAME || 'postgres',
      password: process.env.PASSWORD || 'password',
      database: process.env.DATABASE || 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      // autoLoadEntities: process.env.NODE_ENV === 'prod' ? false : true,
      // synchronize: process.env.NODE_ENV === 'prod' ? false : true,
      ssl:
        process.env.NODE_ENV === 'prod'
          ? {
              rejectUnauthorized: false,
            }
          : false,
    }),
    SeasonsModule,
    BandsModule,
    VideosModule,
    UsersModule,
    VotesModule,
    CommentsModule,
  ],
})
export class AppModule {}
