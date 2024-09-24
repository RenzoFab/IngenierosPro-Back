import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './course/course/course.module';
import { ModuleModule } from './course/module/module.module';
import { SessionModule } from './course/session/session.module';
import { EvaluationModule } from './course/evaluation/evaluation.module';
import { MaterialModule } from './course/material/material.module';
import { TaskModule } from './course/task/task.module';
import { BannerModule } from './company/banner/banner.module';
import { CompanyModule } from './company/company/company.module';
import { AgreementModule } from './company/agreement/agreement.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
