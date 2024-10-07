import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Category } from './entities/category.entity';
import { SaleModule } from 'src/sale/sale.module';
import { AuthModule } from 'src/auth/auth.module';
import { Material, Module as module, Session, Task } from './entities';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [
    TypeOrmModule.forFeature([
      Course,
      Category,
      Material,
      module,
      Session,
      Task,
    ]),
    SaleModule,
    AuthModule,
  ],
})
export class CourseModule {
  // private readonly logger = new Logger(CourseModule.name);
  // onModuleInit() {
  //   this.logger.log('El recurso Cursos ha sido cargado');
  // }
}
