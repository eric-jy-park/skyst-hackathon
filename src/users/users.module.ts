import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSeason } from './entities/user-season.entity';
import { SeasonsModule } from 'src/seasons/seasons.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSeason]), SeasonsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
