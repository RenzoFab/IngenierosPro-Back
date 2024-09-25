import { Injectable } from '@nestjs/common';
import { CreateOwnCertificateDto } from './dto/create-own-certificate.dto';
import { UpdateOwnCertificateDto } from './dto/update-own-certificate.dto';

@Injectable()
export class OwnCertificateService {
  create(createOwnCertificateDto: CreateOwnCertificateDto) {
    return 'This action adds a new ownCertificate';
  }

  findAll() {
    return `This action returns all ownCertificate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ownCertificate`;
  }

  update(id: number, updateOwnCertificateDto: UpdateOwnCertificateDto) {
    return `This action updates a #${id} ownCertificate`;
  }

  remove(id: number) {
    return `This action removes a #${id} ownCertificate`;
  }
}
