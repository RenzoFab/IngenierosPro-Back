import { PartialType } from '@nestjs/swagger';
import { CreateOwnCertificateDto } from './create-own-certificate.dto';

export class UpdateOwnCertificateDto extends PartialType(CreateOwnCertificateDto) {}
