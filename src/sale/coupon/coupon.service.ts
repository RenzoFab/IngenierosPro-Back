import { Injectable, NotFoundException } from '@nestjs/common';
import { Coupon, StudentCoupon } from './entities';
import {
  FindOptionsSelect,
  FindOptionsWhere,
  MoreThan,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentCouponDto } from './dto/create-student-coupon.dto';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon) private couponRepository: Repository<Coupon>,
    @InjectRepository(StudentCoupon)
    private studentCouponRepository: Repository<StudentCoupon>,
  ) {}

  async findOne(term: string, companyId: number) {
    const select: FindOptionsSelect<Coupon> = {
      availableCoupons: true,
      code: true,
      companyId: true,
      dateExpiration: true,
      discountPercentage: true,
      maxPEN: true,
      maxUSD: true,
      minPEN: true,
      minUSD: true,
      serviceId: true,
      type: true,
    };
    const date = new Date();
    const where: FindOptionsWhere<Coupon> = {
      dateExpiration: MoreThan(date),
      availableCoupons: MoreThan(0),
      companyId,
    };
    let coupon: Coupon;
    if (!isNaN(+term)) {
      coupon = await this.couponRepository.findOne({
        select,
        where: {
          id: +term,
          ...where,
        },
      });
    } else {
      coupon = await this.couponRepository.findOne({
        select,
        where: {
          code: term.toUpperCase(),
          ...where,
        },
      });
    }
    if (!coupon)
      throw new NotFoundException(
        `Coupon con id o código "${term}" no encontrado`,
      );
    return coupon;
  }

  async createStudentCoupon(
    { couponId, state, studentId, serviceId }: CreateStudentCouponDto,
    companyId: number,
  ) {
    try {
      const coupon = await this.findOne(couponId.toString(), companyId);
      const expirationDate = this.addDaysToDate(coupon.duration);
      const newStudentCoupon = this.studentCouponRepository.create({
        couponId,
        state,
        studentId,
        expirationDate,
        serviceId,
        type: coupon.type,
      });
      return await this.studentCouponRepository.save(newStudentCoupon);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private addDaysToDate(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }
}
