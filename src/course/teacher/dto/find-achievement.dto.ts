import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { AchievementType } from '../enum/achievement.enum';
import { Type } from 'class-transformer';

export class FindAchievementDto {
  @IsOptional()
  @IsEnum(AchievementType)
  type?: AchievementType;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  userId?: number;
}
