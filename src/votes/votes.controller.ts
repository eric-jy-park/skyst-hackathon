import { Controller, Get, Post, Body, Param, Headers } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post('/:videoId')
  create(
    @Param('videoId') videoId: string,
    @Body() createVoteDto: CreateVoteDto,
    @Headers() header: { authorization: string },
  ) {
    const userId = header.authorization;
    return this.votesService.vote(createVoteDto.count, videoId, userId);
  }

  @Get('/available-votes')
  getAvailableVotes(@Headers() header: { authorization: string }) {
    const userId = header.authorization;
    return this.votesService.getAvailableVotes(userId);
  }

  @Get(':userId')
  findAllVotesByUser(@Param('userId') userId: string) {
    return this.votesService.findAllVotesByUser(userId);
  }
}
