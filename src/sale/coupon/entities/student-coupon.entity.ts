import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Coupon } from './coupon.entity';
import { Student } from 'src/auth/entities';
import { CouponType } from '../enum/coupon.enum';
import { StudentCouponState } from '../enum/student-coupon.enum';

@Entity('tbl_miscupones')
export class StudentCoupon {
  @PrimaryGeneratedColumn({ name: 'miscupones_id' })
  id: number;

  @Column({ name: 'miscupones_fecha_limite', type: 'datetime' })
  expirationDate: Date;

  @Column({ name: 'cupon_estado', type: 'varchar', length: 50 })
  state: StudentCouponState;

  @Column({ name: 'cupon_tipo', type: 'varchar', length: 100, nullable: true })
  type: CouponType;

  @Column({ name: 'servicio_id', type: 'int', nullable: true })
  serviceId: number;

  @Column({ name: 'estudiante_id', type: 'int' })
  studentId: number;

  @Column({
    name: 'miscupones_fecha_obtencion',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  purchaseDate: Date;

  @Column({ name: 'cupon_id', type: 'int' })
  couponId: number;

  @ManyToOne(() => Coupon, (coupon) => coupon.studentCoupons)
  @JoinColumn({ name: 'cupon_id' })
  coupon: Coupon;

  @ManyToOne(() => Student, (student) => student.studentCoupons)
  @JoinColumn({ name: 'estudiante_id' })
  student: Student;
}
