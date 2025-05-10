import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { SeasonsModule } from 'src/seasons/seasons.module';
import { UsersModule } from 'src/users/users.module';
import { Comment } from 'src/comments/entities/comment.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Video, Comment]),
    SeasonsModule,
    UsersModule,
  ],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
