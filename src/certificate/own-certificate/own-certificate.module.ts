import { Module } from '@nestjs/common';
import { OwnCertificateService } from './own-certificate.service';
import { OwnCertificateController } from './own-certificate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnCertificate } from './entities/own-certificate.entity';

@Module({
  controllers: [OwnCertificateController],
  providers: [OwnCertificateService],
  imports: [TypeOrmModule.forFeature([OwnCertificate])],
})
export class OwnCertificateModule {}
