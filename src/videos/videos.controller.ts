import { Controller, Get, Param } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video } from './entities/video.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  @ApiOperation({ summary: 'Get all videos' })
  @ApiResponse({
    status: 200,
    description: 'Returns all videos',
    type: Video,
  })
  findAll() {
    return this.videosService.findAll();
  }

  @Get('preliminary')
  @ApiOperation({ summary: 'Get all preliminary videos' })
  @ApiResponse({
    status: 200,
    description: 'Returns all preliminary videos',
    type: [Video],
  })
  findPreliminary() {
    return this.videosService.findPreliminaryVideos();
  }

  @Get('final')
  @ApiOperation({ summary: 'Get all final videos' })
  @ApiResponse({
    status: 200,
    description: 'Returns all final videos',
    type: [Video],
  })
  findFinal() {
    return this.videosService.findFinalVideos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a video by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a video by ID',
    type: Video,
  })
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }
}
