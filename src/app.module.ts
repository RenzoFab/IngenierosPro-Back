import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './course/course/course.module';
import { ModuleModule } from './course/module/module.module';
import { SessionModule } from './course/session/session.module';
import { EvaluationModule } from './course/evaluation/evaluation.module';

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
    CourseModule,
    ModuleModule,
    SessionModule,
    EvaluationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
