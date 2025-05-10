import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SeasonsService } from './seasons.service';
import { CreateSeasonDto } from './dto/create-season.dto';
import { Season } from './entities/season.entity';

@ApiTags('Seasons')
@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new season' })
  @ApiBody({ type: CreateSeasonDto })
  @ApiResponse({
    status: 201,
    description: 'The season has been successfully created.',
    type: Season,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createSeasonDto: CreateSeasonDto) {
    return this.seasonsService.create(createSeasonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all seasons' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all seasons.',
    type: [Season],
  })
  findAll() {
    return this.seasonsService.findAll();
  }

  @Get('current/preliminary')
  @ApiOperation({ summary: 'Retrieve the current preliminary season' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the current preliminary season.',
    type: Season,
  })
  @ApiResponse({ status: 404, description: 'Current season not found.' })
  getCurrentPreliminarySeason() {
    return this.seasonsService.getCurrentPreliminarySeason();
  }

  @Get('current/final')
  @ApiOperation({ summary: 'Retrieve the current final season' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the current final season.',
    type: Season,
  })
  @ApiResponse({ status: 404, description: 'Current season not found.' })
  getCurrentFinalSeason() {
    return this.seasonsService.getCurrentFinalSeason();
  }
}
