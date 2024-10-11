import { Sale } from './entities/sale.entity';
import { forwardRef, Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { SaleDetail } from './entities/sale-detail.entity';
import { CourseModule } from 'src/course/course/course.module';
import { CouponModule } from '../coupon/coupon.module';

@Module({
  controllers: [SaleController],
  providers: [SaleService],
  imports: [
    TypeOrmModule.forFeature([Sale, SaleDetail]),
    AuthModule,
    CouponModule,
    forwardRef(() => CourseModule),
  ],
  exports: [SaleService, TypeOrmModule],
})
export class SaleModule {}
