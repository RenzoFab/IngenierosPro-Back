import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AgreementModule } from './company/agreement/agreement.module';
import { BannerModule } from './company/banner/banner.module';
import { CompanyModule } from './company/company/company.module';
import { CourseModule } from './course/course/course.module';
import { EvaluationModule } from './course/evaluation/evaluation.module';
import { TeacherModule } from './course/teacher/teacher.module';
import { CertificateModule } from './certificate/certificate/certificate.module';
import { ExternalCertificateModule } from './certificate/external-certificate/external-certificate.module';
import { OwnCertificateModule } from './certificate/own-certificate/own-certificate.module';
import { AuthModule } from './auth/auth.module';
import { dbConfig, mailConfig } from './config';
import { MailModule } from './mail/mail.module';
import { SaleModule } from './sale/sale/sale.module';
import { CulqiModule } from './sale/culqi/culqi.module';
import { CouponModule } from './sale/coupon/coupon.module';
import { CommonModule } from './common/common.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    dbConfig(),
    MailModule,
    CompanyModule,
    BannerModule,
    AgreementModule,
    CourseModule,
    EvaluationModule,
    TeacherModule,
    CertificateModule,
    ExternalCertificateModule,
    OwnCertificateModule,
    AuthModule,
    SaleModule,
    CulqiModule,
    CouponModule,
    CommonModule,
  ],
  controllers: [],
})
export class AppModule {}
