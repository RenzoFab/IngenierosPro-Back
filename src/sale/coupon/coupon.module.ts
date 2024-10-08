import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon, StudentCoupon } from './entities';

@Module({
  controllers: [CouponController],
  providers: [CouponService],
  imports: [TypeOrmModule.forFeature([Coupon, StudentCoupon])],
})
export class CouponModule {}
