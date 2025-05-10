import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { SeasonsService } from 'src/seasons/seasons.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,

    private readonly seasonsService: SeasonsService,

    private readonly usersService: UsersService,
  ) {}

  create(createVideoDto: CreateVideoDto) {
    return 'This action adds a new video';
  }

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

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
