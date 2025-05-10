import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSeason } from './entities/user-season.entity';
import { SeasonsService } from 'src/seasons/seasons.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserSeason)
    private readonly userSeasonRepository: Repository<UserSeason>,

    private readonly seasonsService: SeasonsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);

    const season = await this.seasonsService.getCurrentPreliminarySeason();

    const userSeason = this.userSeasonRepository.create({
      user,
      season,
    });

    await this.userSeasonRepository.save(userSeason);
  }
}
