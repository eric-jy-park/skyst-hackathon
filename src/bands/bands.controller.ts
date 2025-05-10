import { Controller, Get, Param } from '@nestjs/common';
import { BandsService } from './bands.service';

@Controller('bands')
export class BandsController {
  constructor(private readonly bandsService: BandsService) {}

  @Get()
  findAll() {
    return this.bandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bandsService.findOne(id);
  }
}
