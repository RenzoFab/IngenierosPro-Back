import { Module } from '@nestjs/common';
import { ExternalCertificateService } from './external-certificate.service';
import { ExternalCertificateController } from './external-certificate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalCertificate } from './entities/external-certificate.entity';

@Module({
  controllers: [ExternalCertificateController],
  providers: [ExternalCertificateService],
  imports: [TypeOrmModule.forFeature([ExternalCertificate])],
})
export class ExternalCertificateModule {}
