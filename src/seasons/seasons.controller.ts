import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SeasonsService } from './seasons.service';
import { Season } from './entities/season.entity';

@ApiTags('Seasons')
@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

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
