import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSeason } from './entities/user-season.entity';
import { SeasonsService } from 'src/seasons/seasons.service';
import { UpdateUserSeasonDto } from './dto/update-user-season.dto';

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

    const season = await this.seasonsService.getCurrentFinalSeason();
    const preliminarySeason =
      await this.seasonsService.getCurrentPreliminarySeason();

    const userSeason = this.userSeasonRepository.create({
      user,
      season,
    });

    await this.userSeasonRepository.save(userSeason);

    const userSeasonPreliminary = this.userSeasonRepository.create({
      user,
      season: preliminarySeason,
    });

    await this.userSeasonRepository.save(userSeasonPreliminary);
  }

  async findUser(userId: string) {
    if (!userId) throw new BadRequestException('User ID is required');
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['votes', 'votes.video'],
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findUserVotedVideos(userId: string) {
    const user = await this.findUser(userId);

    if (!user.votes) return [];

    return user.votes.map((vote) => vote.video);
  }

  async getCurrentUserFinalSeason(userId: string) {
    const user = await this.findUser(userId);
    const currentSeason = await this.seasonsService.getCurrentFinalSeason();
    const userSeason = user.userSeasons.find(
      (userSeason) => userSeason.season.id === currentSeason.id,
    );

    if (!userSeason)
      throw new BadRequestException(
        'User has no user season for current final season',
      );

    return userSeason;
  }

  async getCurrentUserPreliminarySeason(userId: string) {
    const user = await this.findUser(userId);
    const currentSeason =
      await this.seasonsService.getCurrentPreliminarySeason();
    const userSeason = user.userSeasons.find(
      (userSeason) => userSeason.season.id === currentSeason.id,
    );

    if (!userSeason)
      throw new BadRequestException(
        'User has no user season for current preliminary season',
      );

    return userSeason;
  }

  async getUserAvailableVotes(userId: string) {
    const user = await this.findUser(userId);
    const currentSeason = await this.seasonsService.getCurrentFinalSeason();

    if (!user.userSeasons)
      throw new BadRequestException('User has no user seasons');

    const userSeason = await this.getCurrentUserFinalSeason(userId);

    return currentSeason.voteLimit - userSeason.votesUsed;
  }

  async updateUserSeason(
    userId: string,
    updateUserSeasonDto: UpdateUserSeasonDto,
  ) {
    const userSeason = await this.getCurrentUserFinalSeason(userId);

    return this.userSeasonRepository.save({
      ...userSeason,
      ...updateUserSeasonDto,
    });
  }
}
