import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
  ) {}
  async vote(count: number, videoId: string, userId: string) {
    await this.voteRepository.save({
      count,
      video: {
        id: videoId,
      },
      user: { id: userId },
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
