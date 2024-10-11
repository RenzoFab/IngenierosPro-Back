import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { SaleCurrency, SaleResponsible, SaleType } from '../enum/sale.enum';

export class CreateSaleDto {
  @IsEnum(SaleCurrency)
  currency: SaleCurrency;

  @IsNumber()
  priceBase: number;

  @ValidateIf((o) => o.currency === SaleCurrency.PEN)
  @IsNumber()
  pricePEN: number;

  @ValidateIf((o) => o.currency === SaleCurrency.USD)
  @IsNumber()
  priceUSD: number;

  @ValidateIf((o) => o.currency === SaleCurrency.PEN)
  @IsOptional()
  @IsNumber()
  taxPEN: number = 0;

  @ValidateIf((o) => o.currency === SaleCurrency.USD)
  @IsOptional()
  @IsNumber()
  taxUSD: number = 0;

  @IsOptional()
  @IsNumber()
  status: number = 1;

  @IsEnum(SaleResponsible)
  responsible: SaleResponsible;

  @IsEnum(SaleType)
  type: SaleType;

  @IsOptional()
  @IsString()
  tokenPayment?: string;
}
