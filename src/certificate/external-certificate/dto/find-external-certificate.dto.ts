import { IsOptional, IsString } from 'class-validator';

export class FindExternalCertificateDto {
  @IsOptional()
  @IsString()
  userIdentityCard?: string;
}
