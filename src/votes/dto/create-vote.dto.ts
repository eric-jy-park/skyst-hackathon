import { IsPositive, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateVoteDto {
  @ApiProperty({
    description: 'The number of votes to create',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  count: number;

  @IsOptional()
  @IsString()
  comment: string;
}
