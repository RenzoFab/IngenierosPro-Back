import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule implements OnModuleInit {
  private readonly logger = new Logger(CourseModule.name);
  onModuleInit() {
    this.logger.log('El recurso Cursos ha sido cargado');
  }
}
