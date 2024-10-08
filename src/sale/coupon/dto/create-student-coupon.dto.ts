import { IsEnum, IsNumber } from 'class-validator';
import { StudentCouponState } from '../enum/student-coupon.enum';

export class CreateStudentCouponDto {
  @IsNumber()
  couponId: number;

  @IsNumber()
  studentId: number;

  @IsEnum(StudentCouponState)
  state: StudentCouponState;

  @IsNumber()
  serviceId: number;
}
