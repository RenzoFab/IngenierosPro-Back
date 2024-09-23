import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { SessionStatus } from '../enum/session.enum';
import { ApiProperty } from '@nestjs/swagger';

export class FindSessionDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  moduleId?: number;

  @ApiProperty({ default: SessionStatus.Active })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  state?: SessionStatus;
}
