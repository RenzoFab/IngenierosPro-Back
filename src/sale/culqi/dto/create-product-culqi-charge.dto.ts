import { Type } from 'class-transformer';
import {
  IsOptional,
  IsInt,
  Min,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ProductCartDto } from 'src/compra/dto/productos-cart.dto';
import { CreateCulqiChargeDto } from './create-culqi-charge.dto';

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
  productos: ProductCartDto[];
}
