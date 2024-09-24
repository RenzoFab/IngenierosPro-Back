import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { AgreementStatus } from '../enum/agreement.enum';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FindAgreementDto {
  @IsString()
  @IsOptional()
  company?: string;

  @ApiProperty({
    default: AgreementStatus.Active,
    description: `0 Inactivo | 1 Activo`,
  })
  @IsEnum(AgreementStatus)
  @IsOptional()
  @Type(() => Number)
  state?: AgreementStatus;
}
