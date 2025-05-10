import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { UsersModule } from 'src/users/users.module';
import { VideosModule } from 'src/videos/videos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vote]), UsersModule, VideosModule],
  controllers: [VotesController],
  providers: [VotesService],
})
export class VotesModule {}
