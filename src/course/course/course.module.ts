import { forwardRef, Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Course } from './entities';
import { Material, Module as module, Session, Task } from './entities';
import { SaleModule } from 'src/sale/sale/sale.module';
import { Enrollment } from './entities/enrollment.entity';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [
    TypeOrmModule.forFeature([
      Category,
      Course,
      Enrollment,
      Material,
      module,
      Session,
      Task,
    ]),
    AuthModule,
    forwardRef(() => SaleModule),
  ],
  exports: [TypeOrmModule],
})
export class CourseModule {
  // private readonly logger = new Logger(CourseModule.name);
  // onModuleInit() {
  //   this.logger.log('El recurso Cursos ha sido cargado');
  // }
}
