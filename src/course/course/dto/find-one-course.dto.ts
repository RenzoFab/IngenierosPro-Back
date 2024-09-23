import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { CourseState } from '../enum/course.enum';

export class FindOneCourseDto {
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty({
    default: CourseState.Activo,
  })
  @IsOptional()
  @IsEnum(CourseState)
  state?: CourseState;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  published?: boolean = true;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  modules?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  blockModules?: boolean;

  // @IsOptional()
  // @IsBoolean()
  // @Transform(({ value }) => value === 'true')
  // sessions?: boolean;
}
