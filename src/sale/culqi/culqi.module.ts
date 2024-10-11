import { Module } from '@nestjs/common';
import { CulqiService } from './culqi.service';
import { CulqiController } from './culqi.controller';
import { CommonModule } from 'src/common/common.module';
import { SaleModule } from '../sale/sale.module';
import { CourseModule } from 'src/course/course/course.module';

@Module({
  controllers: [CulqiController],
  providers: [CulqiService],
  imports: [CommonModule, SaleModule],
})
export class CulqiModule {}
