import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { typeErrorMessage } from 'src/common/errors/errors.util';

export class LoginDto {
  @ApiProperty({ default: 1 })
  @IsNumber({}, { message: typeErrorMessage('companyId', 'number') })
  companyId: number;

  @ApiProperty({ default: 'prueba@gmail.com' })
  @IsEmail({}, { message: typeErrorMessage('email', 'email') })
  email: string;

  @ApiProperty({ default: 'renzo1' })
  @IsString({ message: typeErrorMessage('password', 'string') })
  password: string;
}
