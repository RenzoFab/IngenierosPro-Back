import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { Type } from 'class-transformer';
import {
  CourseDifficulty,
  CourseModality,
  CourseOrder,
  CourseType,
} from '../enum/course.enum';

export class FindOwnCourseDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsEnum(CourseModality)
  modality?: CourseModality;

  @IsOptional()
  @IsEnum(CourseType)
  type?: CourseType;

  @IsOptional()
  @IsEnum(CourseDifficulty)
  difficulty?: CourseDifficulty;

  @IsOptional()
  @IsString()
  @IsEnum(CourseOrder)
  order?: CourseOrder;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number = 20;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  offset?: number = 0;
}
