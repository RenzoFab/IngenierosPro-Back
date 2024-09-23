import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  CourseModality,
  CourseState,
  CourseType,
} from '../entities/course.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class GetCourseDto {
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
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  published?: boolean = true;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number = 20;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  offset?: number = 0;
}
