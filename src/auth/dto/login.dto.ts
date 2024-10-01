import { IsEmail, IsString } from 'class-validator';
import { typeErrorMessage } from 'src/common/errors/errors.util';

export class LoginDto {
  companyId: number;

  @IsEmail({}, { message: typeErrorMessage('email', 'email') })
  email: string;

  @IsString({ message: typeErrorMessage('password', 'string') })
  password: string;
}
