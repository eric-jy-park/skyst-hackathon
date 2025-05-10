import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: '박준열',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'ericpark',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  @IsString()
  password: string;
}
