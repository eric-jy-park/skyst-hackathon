import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { VideosService } from 'src/videos/videos.service';
import { SeasonStage } from 'src/seasons/enums/season-stage.enum';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
    private readonly usersService: UsersService,
    private readonly videosService: VideosService,
  ) {}

  async vote(count: number, videoId: string, userId: string, comment?: string) {
    const video = await this.videosService.findOne(videoId);

    if (video?.season.stage === SeasonStage.PRELIMINARY) {
      return this.votePreliminary(count, videoId, userId);
    }

    if (count < 1)
      throw new BadRequestException('Count must be greater than 0');
    if (count > 50) throw new BadRequestException('Count must be less than 50');

    const userSeason =
      await this.usersService.getCurrentUserFinalSeason(userId);

    if (userSeason.votesUsed + count > userSeason.season.voteLimit)
      throw new BadRequestException('User has no votes left');

    await this.voteRepository.save({
      count,
      comment,
      video: {
        id: videoId,
      },
      user: { id: userId },
    });

    await this.usersService.updateUserSeason(userId, {
      votesUsed: userSeason.votesUsed + count,
    });
  }

  async votePreliminary(count: number, videoId: string, userId: string) {
    const existingVote = await this.voteRepository.findOne({
      where: {
        user: { id: userId },
        video: { id: videoId },
      },
    });

    // cuz duplicate voting is allowed in prelim season
    const vote = existingVote
      ? await this.voteRepository.preload({
          id: existingVote.id,
          user: { id: userId },
          video: { id: videoId },
          count: existingVote.count + count,
        })
      : this.voteRepository.create({
          user: { id: userId },
          video: { id: videoId },
          count: count,
        });

    if (!vote) throw new BadRequestException('Vote not found');

    await this.voteRepository.save(vote);
  }

  findAllVotesByUser(userId: string) {
    return this.voteRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
}
