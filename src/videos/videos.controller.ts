import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new video' })
  @ApiResponse({
    status: 201,
    description: 'The video has been successfully created.',
    type: Video,
  })
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

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
    return this.videosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a video by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a video by ID',
    type: Video,
  })
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a video by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a video by ID',
    type: Video,
  })
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}
