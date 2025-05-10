import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/voted')
  async getVotedVideos(@Headers() header: { authorization: string }) {
    const userId = header.authorization;
    return this.usersService.findUserVotedVideos(userId);
  }
}
