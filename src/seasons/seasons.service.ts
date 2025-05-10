import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Season } from './entities/season.entity';
import { IsNull, Repository } from 'typeorm';
import { UserSeason } from 'src/users/entities/user-season.entity';
import { User } from 'src/users/entities/user.entity';
import { SeasonStage } from './enums/season-stage.enum';

@Injectable()
export class SeasonsService {
  constructor(
    @InjectRepository(Season)
    private readonly seasonRepository: Repository<Season>,
  ) {}

  async create(createDto: CreateSeasonDto): Promise<Season> {
    return await this.seasonRepository.manager.transaction(async (em) => {
      const season = await em.save(Season, createDto);

      const users = await em.find(User);

      const seeds = users.map((u) => {
        const us = new UserSeason();
        us.user = u;
        us.season = season;
        return us;
      });

      await em.save(UserSeason, seeds);

      return season;
    });
  }

  async findAll() {
    return this.seasonRepository.find();
  }

  async findOne(id: Season['id']) {
    const targetSeason = await this.seasonRepository.findOne({ where: { id } });

    if (!targetSeason)
      throw new NotFoundException(`Season with id: ${id} does not exist.`);

    return targetSeason;
  }

  async getCurrentPreliminarySeason() {
    const seasons = await this.seasonRepository.find({
      where: {
        end_date: IsNull(),
        stage: SeasonStage.PRELIMINARY,
      },
    });

    if (seasons.length > 1)
      throw new ConflictException('Multiple current season found. Fix it');

    return seasons[0];
  }

  async getCurrentFinalSeason() {
    const seasons = await this.seasonRepository.find({
      where: {
        end_date: IsNull(),
        stage: SeasonStage.FINAL,
      },
    });

    if (seasons.length > 1)
      throw new ConflictException('Multiple current season found. Fix it');

    return seasons[0];
  }

  async update(id: Season['id'], updateSeasonDto: UpdateSeasonDto) {
    const targetSeason = await this.seasonRepository.preload({
      id,
      ...updateSeasonDto,
    });

    if (!targetSeason)
      throw new NotFoundException(`Season with id: ${id} does not exist.`);

    return this.seasonRepository.save(targetSeason);
  }

  async remove(id: Season['id']) {
    const targetSeason = await this.findOne(id);
    await this.seasonRepository.delete(targetSeason);
  }
}
