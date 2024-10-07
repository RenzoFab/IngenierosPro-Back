import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { SaleCurrency } from '../enum/sale.enum';

export class CreateSaleDto {
  @IsEnum(SaleCurrency)
  currency: SaleCurrency;

  @IsNumber()
  priceBase: number;

  @IsNumber()
  pricePEN: number;

  @IsNumber()
  priceUSD: number;

  @IsOptional()
  @IsNumber()
  taxPEN: number = 0;

  @IsOptional()
  @IsNumber()
  taxUSD: number = 0;

  @IsOptional()
  @IsNumber()
  status: number = 1;

  @IsString()
  responsible: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  tokenPayment?: string;
}
