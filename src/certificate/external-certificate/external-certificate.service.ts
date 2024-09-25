import { Injectable } from '@nestjs/common';
import { CreateExternalCertificateDto } from './dto/create-external-certificate.dto';
import { UpdateExternalCertificateDto } from './dto/update-external-certificate.dto';

@Injectable()
export class ExternalCertificateService {
  create(createExternalCertificateDto: CreateExternalCertificateDto) {
    return 'This action adds a new externalCertificate';
  }

  findAll() {
    return `This action returns all externalCertificate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} externalCertificate`;
  }

  update(id: number, updateExternalCertificateDto: UpdateExternalCertificateDto) {
    return `This action updates a #${id} externalCertificate`;
  }

  remove(id: number) {
    return `This action removes a #${id} externalCertificate`;
  }
}
