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

export class CreateCulqiChargeDto {
  @IsString()
  email: string;
  @IsString()
  token_culqi: string;

  // @IsOptional()
  // @IsInt({ message: 'El cupon_id debe ser de tipo int' })
  // @Min(1, {
  //   message: 'El cupon_id debe ser como minimo 1',
  // })
  // cupon_id?: number;
  @IsOptional()
  @IsBoolean()
  capture: boolean;

  @IsNumber()
  @Min(6)
  precio_total: number;

  @IsString()
  @IsIn(['USD', 'PEN'], {
    message: 'moneda_tipo debe ser USD o PEN',
  })
  moneda_tipo: string;

  // * METADATA
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsBoolean()
  external: boolean = false;

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => ProductCartDto)
  // productos: ProductCartDto[];
}
