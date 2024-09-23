import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { ModuleStatus } from '../enum/module.enum';

export class FindOneModuleDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  state?: ModuleStatus;
}
