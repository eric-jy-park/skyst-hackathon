import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  createComment(
    createCommentDto: CreateCommentDto,
    videoId: string,
    userId: string,
  ) {
    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      video: { id: videoId },
      user: { id: userId },
    });

    return this.commentRepository.save(comment);
  }

  findAll(videoId: string) {
    return this.commentRepository.find({
      where: {
        video: { id: videoId },
      },
    });
  }
}
