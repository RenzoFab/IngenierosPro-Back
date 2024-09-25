import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExternalCertificate } from './entities/external-certificate.entity';
import { Repository } from 'typeorm';
import { FindExternalCertificateDto } from './dto';

@Injectable()
export class ExternalCertificateService {
  constructor(
    @InjectRepository(ExternalCertificate)
    private externalCertificateRepository: Repository<ExternalCertificate>,
  ) {}
  // create(createExternalCertificateDto: CreateExternalCertificateDto) {
  //   return 'This action adds a new externalCertificate';
  // }

  findAll({ term }: FindExternalCertificateDto) {
    const certificates = this.externalCertificateRepository.find({
      where: {
        userIdentityCard: term,
      },
    });
    return certificates;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} externalCertificate`;
  // }
  // update(id: number, updateExternalCertificateDto: UpdateExternalCertificateDto) {
  //   return `This action updates a #${id} externalCertificate`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} externalCertificate`;
  // }
}
