import { Type } from 'class-transformer';
import {
  IsOptional,
  IsInt,
  Min,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateCulqiChargeDto } from './create-culqi-charge.dto';
import { ProductCartDto } from './productos-cart.dto';

export class CreateProductCulqiChargeDto extends CreateCulqiChargeDto {
  @IsOptional()
  @IsInt({ message: 'El cupon_id debe ser de tipo int' })
  @Min(1, {
    message: 'El cupon_id debe ser como minimo 1',
  })
  cupon_id?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductCartDto)
  products: ProductCartDto[];
}
