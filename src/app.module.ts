import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { SeasonsModule } from './seasons/seasons.module';
import { BandsModule } from './bands/bands.module';
import { VideosModule } from './videos/videos.module';
import { UsersModule } from './users/users.module';
import { VotesModule } from './votes/votes.module';

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
    BooksModule,
    SeasonsModule,
    BandsModule,
    VideosModule,
    UsersModule,
    VotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
