import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { SeasonsService } from './seasons.service';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
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

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific season by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the season to retrieve',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the season.',
    type: Season,
  })
  @ApiResponse({ status: 404, description: 'Season not found.' })
  findOne(@Param('id') id: Season['id']) {
    return this.seasonsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific season by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the season to update',
    type: String,
  })
  @ApiBody({ type: UpdateSeasonDto })
  @ApiResponse({
    status: 200,
    description: 'The season has been successfully updated.',
    type: Season,
  })
  @ApiResponse({ status: 404, description: 'Season not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  update(
    @Param('id') id: Season['id'],
    @Body() updateSeasonDto: UpdateSeasonDto,
  ) {
    return this.seasonsService.update(id, updateSeasonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific season by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the season to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The season has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Season not found.' })
  remove(@Param('id') id: Season['id']) {
    return this.seasonsService.remove(id);
  }
}
