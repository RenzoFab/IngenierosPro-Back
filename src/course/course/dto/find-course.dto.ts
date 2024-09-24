import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { Transform, Type } from 'class-transformer';
import { FindOneCourseDto } from './find-one-course.dto';
import {
  CourseDifficulty,
  CourseModality,
  CourseOrder,
  CourseState,
  CourseType,
} from '../enum/course.enum';
import { ApiProperty } from '@nestjs/swagger';

export class FindCourseDto {
  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    default: CourseState.Activo,
  })
  @IsOptional()
  @IsEnum(CourseState)
  state?: CourseState;

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
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  published?: boolean = true;

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
