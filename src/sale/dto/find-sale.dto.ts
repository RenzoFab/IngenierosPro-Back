import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class FindSaleDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  studentId?: number;
}
