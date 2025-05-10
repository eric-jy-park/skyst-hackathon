import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Band } from './entities/band.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BandsService {
  constructor(
    @InjectRepository(Band)
    private bandRepository: Repository<Band>,
  ) {}

  findAll() {
    return this.bandRepository.find();
  }

  findOne(id: string) {
    return this.bandRepository.findOne({
      where: {
        id,
      },
    });
  }
}
