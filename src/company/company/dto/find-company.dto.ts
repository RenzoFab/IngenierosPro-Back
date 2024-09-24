import { IsEnum, IsOptional } from 'class-validator';
import { CompanyStatus } from '../enum/company.enum';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FindCompanyDto {
  @ApiProperty({
    default: CompanyStatus.Active,
    description: `0 Inactivo | 1 Activo`,
  })
  @IsEnum(CompanyStatus)
  @IsOptional()
  @Type(() => Number)
  state?: CompanyStatus;
}
