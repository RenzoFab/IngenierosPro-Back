import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { ModuleStatus } from '../enum/module.enum';
import { ApiProperty } from '@nestjs/swagger';
import { FindOneModuleDto } from './find-one-module.dto';

export class FindModuleDto extends FindOneModuleDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  courseId?: number;
}
