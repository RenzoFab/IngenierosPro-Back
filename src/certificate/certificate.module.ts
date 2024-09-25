import { Module } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CertificateController } from './certificate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalCertificate } from './entities/external-certificate.entitiy';

@Module({
  controllers: [CertificateController],
  providers: [CertificateService],
  imports: [TypeOrmModule.forFeature([ExternalCertificate])],
})
export class CertificateModule {}
