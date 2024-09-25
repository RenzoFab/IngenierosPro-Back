import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class FindOneTeacherDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  courses?: true;
}
