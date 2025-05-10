import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { SeasonsService } from 'src/seasons/seasons.service';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,

    private readonly seasonsService: SeasonsService,
  ) {}

  findAll() {
    return this.videoRepository.find();
  }

  async findPreliminaryVideos() {
    const season = await this.seasonsService.getCurrentPreliminarySeason();

    const videos = await this.videoRepository.find({
      where: {
        season: {
          id: season.id,
        },
      },
    });

    return videos
      .map((video) => ({
        ...video,
        voteCount: video.votes.reduce((sum, vote) => sum + vote.count, 0),
      }))
      .sort(() => Math.random() - 0.5);
  }

  async findFinalVideos() {
    const season = await this.seasonsService.getCurrentFinalSeason();
    const videos = await this.videoRepository.find({
      where: {
        season: {
          id: season.id,
        },
      },
    });

    return videos
      .map((video) => ({
        ...video,
        voteCount: video.votes.reduce((sum, vote) => sum + vote.count, 0),
      }))
      .sort((a, b) => b.voteCount - a.voteCount);
  }

  findOne(id: string) {
    return this.videoRepository.findOne({
      where: {
        id,
      },
    });
  }
}
