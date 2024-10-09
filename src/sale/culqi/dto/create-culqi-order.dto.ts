import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductCartDto } from 'src/compra/dto/productos-cart.dto';

export class CreateCulqiOrderDto {
  @IsString()
  name: string;
  @IsString()
  lastName: string;
  @IsString()
  email: string;
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsBoolean()
  confirm: boolean;

  // @IsOptional()
  // @IsInt({ message: 'El cupon_id debe ser de tipo int' })
  // @Min(1, {
  //   message: 'El cupon_id debe ser como minimo 1',
  // })
  // cupon_id?: number;

  @IsNumber()
  @Min(6)
  precio_total: number;

  @IsString()
  @IsIn(['USD', 'PEN'], {
    message: 'moneda_tipo debe ser USD o PEN',
  })
  moneda_tipo: string;

  @IsBoolean()
  external: boolean = false;

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => ProductCartDto)
  // productos: ProductCartDto[];
}
