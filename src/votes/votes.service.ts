import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
    private readonly usersService: UsersService,
  ) {}
  async vote(count: number, videoId: string, userId: string) {
    if (count < 1)
      throw new BadRequestException('Count must be greater than 0');
    if (count > 50) throw new BadRequestException('Count must be less than 50');

    const userSeason = await this.usersService.getCurrentUserSeason(userId);

    if (userSeason.votesUsed + count > userSeason.season.voteLimit)
      throw new BadRequestException('User has no votes left');

    await this.voteRepository.save({
      count,
      video: {
        id: videoId,
      },
      user: { id: userId },
    });

    await this.usersService.updateUserSeason(userId, {
      votesUsed: userSeason.votesUsed + count,
    });
  }

  async getAvailableVotes(userId: string) {
    const availableVotes =
      await this.usersService.getUserAvailableVotes(userId);
    return availableVotes;
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
