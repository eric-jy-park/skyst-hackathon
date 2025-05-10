import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post('/:videoId')
  create(
    @Param('videoId') videoId: string,
    @Body() createVoteDto: CreateVoteDto,
    @Req() req: Request,
  ) {
    return this.votesService.vote(createVoteDto.count, videoId, '1');
  }

  @Get(':userId')
  findAllVotesByUser(@Param('userId') userId: string) {
    return this.votesService.findAllVotesByUser(userId);
  }
}
