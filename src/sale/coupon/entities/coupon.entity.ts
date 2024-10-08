import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CouponState, CouponType } from '../enum/coupon.enum';
import { Company } from 'src/company/company/entities/company.entity';
import { User } from 'src/auth/entities';
import { StudentCoupon } from './student-coupon.entity';

@Entity('tbl_cupon')
export class Coupon {
  @PrimaryGeneratedColumn({ name: 'cupon_id' })
  id: number;

  @Column({
    name: 'cupon_codigo',
    type: 'varchar',
    length: 50,
  })
  code: string;

  @Column({
    name: 'cupon_descripcion',
    type: 'varchar',
    length: 500,
  })
  description: string;

  @Column({
    name: 'cupon_fecha_creacion',
    type: 'datetime',
  })
  dateCreation: Date;

  @Column({
    name: 'cupon_fecha_limite',
    type: 'datetime',
  })
  dateExpiration: Date;

  @Column({
    name: 'cupon_tiempo_duracion',
    type: 'int',
  })
  duration: number;

  @Column({
    name: 'cupon_estudiante_maxima',
    type: 'int',
  })
  totalCoupons: number;

  @Column({
    name: 'cupon_capacidad_estudiantes',
    type: 'int',
    default: 0,
  })
  availableCoupons: number;

  @Column({
    name: 'cupon_monto_porcentaje',
    type: 'decimal',
  })
  discountPercentage: number;

  @Column({
    name: 'cupon_estado',
    type: 'tinyint',
  })
  state: CouponState;

  @Column({
    name: 'cupon_creador_usuario',
    type: 'varchar',
  })
  creatorUser: string;

  @Column({
    name: 'cupon_tipo',
    type: 'varchar',
  })
  type: CouponType;

  @Column({
    name: 'servicio_id',
    type: 'int',
  })
  serviceId: number;

  @Column({
    name: 'institucion_id',
    type: 'tinyint',
  })
  companyId: number;

  @Column({
    name: 'usuario_id',
    type: 'int',
  })
  userId: number;

  @Column({
    name: 'cupon_monto_minimo_soles',
    type: 'float',
  })
  minPEN: number;

  @Column({
    name: 'cupon_monto_maximo_soles',
    type: 'float',
  })
  maxPEN: number;

  @Column({
    name: 'cupon_monto_minimo_dolares',
    type: 'float',
  })
  minUSD: number;

  @Column({
    name: 'cupon_monto_maximo_dolares',
    type: 'float',
  })
  maxUSD: number;

  @OneToMany(() => StudentCoupon, (studentCoupon) => studentCoupon.coupon)
  studentCoupons: StudentCoupon[];

  @ManyToOne(() => Company, (company) => company.coupons)
  @JoinColumn({ name: 'institucion_id' })
  company: Company;

  @ManyToOne(() => User, (user) => user.coupons)
  @JoinColumn({ name: 'usuario_id' })
  user: User;
}
