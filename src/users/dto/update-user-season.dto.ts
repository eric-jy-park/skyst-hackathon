import { IsNumber } from 'class-validator';

export class UpdateUserSeasonDto {
  @IsNumber()
  votesUsed: number;
}
