import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { Type } from 'class-transformer';
import { FindOneCourseDto } from './find-one-course.dto';
import { CourseModality, CourseType } from '../enum/course.enum';

export class FindCourseDto extends FindOneCourseDto {
  // @IsOptional()
  // @IsString()
  // company?: string;

  @IsOptional()
  @IsString()
  category?: string;

  // @ApiProperty({
  //   default: CourseState.Activo,
  // })
  // @IsOptional()
  // @IsEnum(CourseState)
  // state?: CourseState;

  @IsOptional()
  @IsEnum(CourseModality)
  modality?: CourseModality;

  @IsOptional()
  @IsEnum(CourseType)
  type?: CourseType;

  // @IsOptional()
  // @IsBoolean()
  // @Transform(({ value }) => value === 'true')
  // published?: boolean = true;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number = 20;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  offset?: number = 0;
}
