import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateSeasonDto {
  @ApiProperty({
    description: 'The number of the season',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  season_no: number;

  @ApiProperty({
    description: 'The start date of the season',
    example: '2024-01-01T00:00:00.000Z',
  })
  @IsNotEmpty()
  @IsDateString()
  start_date: Date;

  @ApiProperty({
    description: 'The end date of the season (optional)',
    example: '2024-12-31T23:59:59.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  end_date?: Date;
}
