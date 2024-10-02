import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AgreementModule } from './company/agreement/agreement.module';
import { BannerModule } from './company/banner/banner.module';
import { CompanyModule } from './company/company/company.module';
import { CourseModule } from './course/course/course.module';
import { EvaluationModule } from './course/evaluation/evaluation.module';
import { MaterialModule } from './course/material/material.module';
import { ModuleModule } from './course/module/module.module';
import { SessionModule } from './course/session/session.module';
import { TaskModule } from './course/task/task.module';
import { TeacherModule } from './course/teacher/teacher.module';
import { CertificateModule } from './certificate/certificate/certificate.module';
import { ExternalCertificateModule } from './certificate/external-certificate/external-certificate.module';
import { OwnCertificateModule } from './certificate/own-certificate/own-certificate.module';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { SaleModule } from './sale/sale.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
    }),
    CompanyModule,
    BannerModule,
    AgreementModule,
    CourseModule,
    ModuleModule,
    SessionModule,
    EvaluationModule,
    MaterialModule,
    TaskModule,
    TeacherModule,
    CertificateModule,
    ExternalCertificateModule,
    OwnCertificateModule,
    AuthModule,
    PaymentModule,
    SaleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
