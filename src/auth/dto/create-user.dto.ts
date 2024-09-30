import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import {
  dateErrorMessage,
  lengthErrorMessage,
  passwordError,
  passwordMatch,
  typeErrorMessage,
} from 'src/common/errors/errors.util';

export class CreateUserDto {
  @IsString({ message: typeErrorMessage('email', 'string') })
  @IsEmail({}, { message: typeErrorMessage('email', 'email') })
  email: string;

  @ValidateIf((o) => o.type !== 'Google')
  @IsNumber({}, { message: typeErrorMessage('emailCode', 'number') })
  @Type(() => Number)
  emailCode: number;

  @ValidateIf((o) => o.type !== 'Google')
  @IsString({ message: typeErrorMessage('password', 'string') })
  @MinLength(5, { message: lengthErrorMessage('password', 'min', 5) })
  @MaxLength(20, { message: lengthErrorMessage('password', 'max', 20) })
  @Matches(passwordMatch, {
    message: passwordError('password'),
  })
  password?: string;

  @IsString({ message: typeErrorMessage('names', 'string') })
  @MaxLength(150, { message: lengthErrorMessage('names', 'max', 150) })
  name: string;

  @IsString({ message: typeErrorMessage('surnames', 'string') })
  @MaxLength(150, { message: lengthErrorMessage('surnames', 'max', 150) })
  lastName: string;

  @IsString({ message: typeErrorMessage('country', 'string') })
  @MaxLength(30, { message: lengthErrorMessage('country', 'max', 30) })
  country: string;

  @IsString({ message: typeErrorMessage('idCard', 'string') })
  @MaxLength(100, { message: lengthErrorMessage('idCard', 'max', 100) })
  idCard: string;

  @IsDateString({}, { message: dateErrorMessage('birthDate') })
  birthDate: string;

  @IsString({ message: typeErrorMessage('phone', 'string') })
  @MinLength(8, { message: lengthErrorMessage('phone', 'min', 8) })
  @MaxLength(30, { message: lengthErrorMessage('phone', 'max', 30) })
  phone: string;

  @IsBoolean({
    message: typeErrorMessage('advertising', 'boolean'),
  })
  advertising: boolean;

  @IsString({ message: typeErrorMessage('type', 'string') })
  @IsIn(['Default', 'Google'], {
    message: 'El campo type debe ser Default o Google',
  })
  type: string;
}
