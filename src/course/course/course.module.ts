import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Company } from './entities/company.entiity';
import { Category } from './entities/category.entity';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [TypeOrmModule.forFeature([Course, Company, Category])],
})
export class CourseModule {
  // private readonly logger = new Logger(CourseModule.name);
  // onModuleInit() {
  //   this.logger.log('El recurso Cursos ha sido cargado');
  // }
}
