import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { Season } from './entities/season.entity';

@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Post()
  create(@Body() createSeasonDto: CreateSeasonDto) {
    return this.seasonsService.create(createSeasonDto);
  }

  @Get()
  findAll() {
    return this.seasonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Season['id']) {
    return this.seasonsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: Season['id'],
    @Body() updateSeasonDto: UpdateSeasonDto,
  ) {
    return this.seasonsService.update(id, updateSeasonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Season['id']) {
    return this.seasonsService.remove(id);
  }
}
