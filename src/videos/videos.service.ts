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

    return this.videoRepository.find({
      where: {
        season: {
          id: season.id,
        },
      },
    });
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

    return videos.sort((a, b) => b.votes.length - a.votes.length);
  }

  findOne(id: string) {
    return this.videoRepository.findOne({
      where: {
        id,
      },
    });
  }
}
