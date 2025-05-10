import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':videoId')
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('videoId') videoId: string,
    @Req() req: Request,
  ) {
    return this.commentsService.createComment(createCommentDto, videoId, '1');
  }

  @Get(':videoId')
  findAll(@Param('videoId') videoId: string) {
    return this.commentsService.findAll(videoId);
  }
}
