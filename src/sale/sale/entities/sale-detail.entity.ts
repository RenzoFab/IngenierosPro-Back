import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Sale } from './sale.entity';
import { SaleDetailServiceType } from '../enum/sale-detail.enum';
import { Enrollment } from 'src/course/course/entities/enrollment.entity';

@Entity('tbl_detalleventa')
export class SaleDetail {
  @PrimaryGeneratedColumn({
    name: 'detalleventa_id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'detalleventa_servicio_id',
    type: 'int',
  })
  serviceId: number;

  @Column({
    name: 'detalleventa_tipo_servicio',
    length: 100,
  })
  serviceType: SaleDetailServiceType;

  @Column({
    name: 'detalleventa_costo_soles',
    type: 'decimal',
  })
  pricePEN?: number;

  @Column({
    type: 'decimal',
    name: 'detalleventa_costo_dolares',
  })
  priceUSD?: number;

  @Column({
    name: 'cupon_monto_porcentaje',
    type: 'float',
  })
  couponPercentage?: number;

  @Column({
    name: 'cupon_monto_descuento_soles',
    type: 'float',
  })
  couponDiscountPEN?: number;

  @Column({
    type: 'decimal',
    name: 'cupon_monto_descuento_dolares',
  })
  couponDiscountUSD?: number;

  @Column({
    name: 'detalleventa_fecha_inicio_acceso',
    type: 'datetime',
  })
  accessStartDate?: Date;

  @Column({
    name: 'detalleventa_fecha_fin_acceso',
    type: 'datetime',
  })
  accessEndDate?: Date;

  @Column({ length: 30, name: 'usuario_pais' })
  userCountry: string;

  @Column({ type: 'tinyint', default: 1, name: 'detalleventa_estado' })
  status: number;

  @OneToOne(() => Enrollment, (enrollment) => enrollment.saleDetail)
  enrollment: Enrollment;

  @ManyToOne(() => Sale, (sale) => sale.saleDetails)
  @JoinColumn({ name: 'compra_id' })
  sale: Sale;

  // @ManyToOne(() => Coupon, (coupon) => coupon.saleDetails, { nullable: true })
  // coupon?: Coupon;

  // @ManyToOne(() => AccessPlan, (accessPlan) => accessPlan.saleDetails, {
  //   nullable: true,
  // })
  // accessPlan?: AccessPlan;
}
