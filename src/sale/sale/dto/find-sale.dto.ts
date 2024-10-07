import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { SaleStatus } from '../enum/sale.enum';

export class FindSaleDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  status?: SaleStatus;
}
