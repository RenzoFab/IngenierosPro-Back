import { IsEnum, IsNumber, IsOptional, ValidateIf } from 'class-validator';
import { SaleDetailServiceType } from '../enum/sale-detail.enum';
import { SaleCurrency } from '../enum/sale.enum';

export class CreateSaleDetailDto {
  @IsEnum(SaleCurrency)
  currency: SaleCurrency;

  @IsNumber()
  serviceId: number;

  @IsEnum(SaleDetailServiceType)
  serviceType: SaleDetailServiceType;

  @ValidateIf((o) => o.currency === SaleCurrency.PEN)
  @IsNumber()
  pricePEN?: number;

  @ValidateIf((o) => o.currency === SaleCurrency.USD)
  @IsOptional()
  @IsNumber()
  priceUSD?: number;

  @ValidateIf((o) => o.currency === SaleCurrency.PEN)
  @IsNumber()
  couponDiscountPEN?: number;

  @ValidateIf((o) => o.currency === SaleCurrency.USD)
  @IsNumber()
  couponDiscountUSD?: number;

  @IsNumber()
  status: number = 1;

  @IsNumber()
  @IsOptional()
  couponId?: number;
}
