import { PartialType } from '@nestjs/swagger';
import { CreateCulqiDto } from './create-culqi.dto';

export class UpdateCulqiDto extends PartialType(CreateCulqiDto) {}
