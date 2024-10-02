import { Student } from 'src/auth/entities';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';

@Entity('tbl_compra')
export class Sale {
  @PrimaryGeneratedColumn({ name: 'compra_id' })
  id: number;

  @Column({
    name: 'compra_tipo_moneda',
    type: 'varchar',
  })
  currency: string;

  @Column({
    name: 'compra_fecha',
    type: 'datetime',
  })
  date: Date;

  @Column({
    name: 'compra_fecha_pago',
    type: 'datetime',
  })
  paymentDate: Date;

  @Column({
    name: 'compra_precio_total',
    type: 'decimal',
  })
  priceTotal: number;

  @Column({
    name: 'compra_precio_final_soles',
    type: 'decimal',
  })
  pricePEN: number;

  @Column({
    name: 'compra_precio_final_dolares',
    type: 'decimal',
  })
  priceUSD: number;

  @Column({
    name: 'compra_impuesto_transaccion_soles',
    type: 'decimal',
  })
  taxPEN: number;

  @Column({
    name: 'compra_impuesto_transaccion_dolares',
    type: 'decimal',
  })
  taxUSD: number;

  @Column({
    name: 'compra_token_pasarela',
    type: 'varchar',
  })
  tokenPayment: string;

  @Column({
    name: 'compra_estado',
    type: 'tinyint',
    width: 1,
  })
  status: number;

  @Column({
    name: 'compra_numero_transaccion',
    type: 'varchar',
  })
  transactionNumber: string;

  @Column({
    type: 'varchar',
    name: 'compra_productos',
  })
  products: string;

  @Column({
    name: 'compra_tipo_pago',
    type: 'varchar',
  })
  type: string;

  @Column({
    name: 'compra_responsable',
    type: 'varchar',
  })
  responsible: string;

  @Column({
    name: 'estudiante_id',
    type: 'int',
  })
  studentId: number;

  @ManyToOne(() => Student, (student) => student.sales)
  @JoinColumn({ name: 'estudiante_id' })
  student: Student;

  // @ManyToOne(() => Coupon, (coupon) => coupon.compras, { nullable: true })
  // @JoinColumn({ name: 'cupon_id' })
  // coupon: Coupon;
}
