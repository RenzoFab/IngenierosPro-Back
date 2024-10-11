import {
  IsArray,
  IsInt,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateCulqiOrderDto } from './create-culqi-order.dto';
import { Type } from 'class-transformer';
import { ProductCartDto } from './productos-cart.dto';

export class CreateProductCulqiOrderDto extends CreateCulqiOrderDto {
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
