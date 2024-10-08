import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Entity,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Company } from 'src/company/company/entities/company.entity';
import { OwnCertificate } from 'src/certificate/own-certificate/entities/own-certificate.entity';
import { Sale } from 'src/sale/sale/entities/sale.entity';
import { StudentCoupon } from 'src/sale/coupon/entities/student-coupon.entity';
import { Enrollment } from 'src/course/course/entities/enrollment.entity';

@Entity('tbl_estudiante')
export class Student {
  @PrimaryGeneratedColumn({ name: 'estudiante_id' })
  id: number;

  @Column({
    name: 'estudiante_carrera',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  career: string;

  @Column({ name: 'estudiante_publicidad', type: 'tinyint' })
  advertising: number;

  @Column({ name: 'estudiante_cantidad_curso', type: 'int', nullable: true })
  courseCount: number;

  @Column({
    name: 'estudiante_tipo',
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  type: string;

  @Column({
    name: 'institucion_id',
    type: 'int',
  })
  companyId: number;

  @Column({
    name: 'usuario_id',
    type: 'int',
  })
  userId: number;

  @OneToOne(() => User, (user) => user.student)
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @OneToMany(() => OwnCertificate, (ownCertificate) => ownCertificate.student)
  ownCertificates: OwnCertificate[];

  @OneToMany(() => Sale, (sale) => sale.student)
  sales: Sale[];

  @OneToMany(() => StudentCoupon, (studentCoupons) => studentCoupons.student)
  studentCoupons: StudentCoupon[];

  @OneToMany(() => Enrollment, (Enrollment) => Enrollment.student)
  enrollments: Enrollment[];

  @ManyToOne(() => Company, (company) => company.students)
  @JoinColumn({ name: 'institucion_id' })
  company: Company;
}
