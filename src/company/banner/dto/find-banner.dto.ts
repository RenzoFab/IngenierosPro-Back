import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FindBannerDto {
  @IsString()
  @IsOptional()
  company?: string;
}
