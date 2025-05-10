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

  async votePreliminary(
    count: number,
    videoId: string,
    userId: string,
    comment?: string,
  ) {
    const existingVote = await this.voteRepository.findOne({
      where: {
        user: { id: userId },
        video: { id: videoId },
      },
    });

    const userSeason =
      await this.usersService.getCurrentUserPreliminarySeason(userId);

    if (existingVote) {
      // Update existing vote directly
      existingVote.count += count;
      if (comment !== undefined) {
        existingVote.comment = comment;
      }
      await this.voteRepository.save(existingVote);
    } else {
      // Create new vote
      const newVote = this.voteRepository.create({
        user: { id: userId },
        video: { id: videoId },
        count: count,
        comment,
      });
      await this.voteRepository.save(newVote);
    }

    await this.usersService.updateUserSeason(userId, {
      votesUsed: userSeason.votesUsed,
    });
  }

  async vote(count: number, videoId: string, userId: string, comment?: string) {
    const video = await this.videosService.findOne(videoId);
    console.log(userId);
    if (video?.season.stage === SeasonStage.PRELIMINARY) {
      return this.votePreliminary(count, videoId, userId, comment);
    }

    if (count < 1)
      throw new BadRequestException('Count must be greater than 0');
    if (count > 50) throw new BadRequestException('Count must be less than 50');

    const userSeason =
      await this.usersService.getCurrentUserFinalSeason(userId);

    if (userSeason.votesUsed + count > userSeason.season.voteLimit)
      throw new BadRequestException('User has no votes left');

    // Check if vote already exists
    const existingVote = await this.voteRepository.findOne({
      where: {
        user: { id: userId },
        video: { id: videoId },
      },
    });

    if (existingVote) {
      // Update existing vote
      existingVote.count += count;
      if (comment !== undefined) {
        existingVote.comment = comment;
      }
      await this.voteRepository.save(existingVote);
    } else {
      // Create new vote
      const newVote = this.voteRepository.create({
        count,
        comment,
        video: { id: videoId },
        user: { id: userId },
      });
      await this.voteRepository.save(newVote);
    }

    // Update user season votes count
    await this.usersService.updateUserSeason(userId, {
      votesUsed: userSeason.votesUsed + count,
    });
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
