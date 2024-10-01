import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber } from 'class-validator';
import { typeErrorMessage } from 'src/common/errors/errors.util';

export class SendCodeEmailDto {
  @ApiProperty({ default: 1 })
  @IsNumber({}, { message: typeErrorMessage('companyId', 'number') })
  companyId: number;

  @ApiProperty({ default: 'prueba@gmail.com' })
  @IsEmail({}, { message: typeErrorMessage('email', 'email') })
  email: string;
}
