import { Student } from 'src/auth/entities/student.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tbl_certificadopropio')
export class OwnCertificate {
  @PrimaryGeneratedColumn({ name: 'certificadopropio_id' })
  id: number;

  @Column({ name: 'certificadopropio_codigo', type: 'varchar', length: 30 })
  code: string;

  @Column({ name: 'certificadopropio_fecha_creacion', type: 'datetime' })
  creationDate: Date;

  @Column({ name: 'estudiante_nombres', type: 'varchar', length: 50 })
  studentFirstName: string;

  @Column({ name: 'estudiante_apellidos', type: 'varchar', length: 50 })
  studentLastName: string;

  @Column({
    name: 'estudiante_imagen',
    type: 'varchar',
    length: 600,
    nullable: true,
  })
  studentImage: string;

  @Column({ name: 'certificadopropio_estado', type: 'tinyint' })
  status: number;

  @Column({ name: 'certificadopropio_horas_certificacion', type: 'float' })
  certificationHours: number;

  @Column({
    name: 'certificadopropio_link',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  certificateLink: string;

  @Column({ name: 'certificadopropio_validado', type: 'tinyint', default: 0 })
  validated: number;

  @Column({
    name: 'certificadopropio_visualizacion',
    type: 'tinyint',
    nullable: true,
  })
  visualization: number;

  @Column({ name: 'detalleventa_id', type: 'int' })
  saleDetailId: number;

  @Column({ name: 'certificado_id', type: 'int' })
  certificateId: number;

  @Column({ name: 'estudiante_id', type: 'int' })
  studentId: number;

  //   @ManyToOne(() => SaleDetail, (saleDetail) => saleDetail.certificates, {
  //     nullable: true,
  //   })
  //   @JoinColumn({ name: 'detalleventa_id' })
  //   saleDetail: SaleDetail;

  //   @ManyToOne(
  //     () => Certificate,
  //     (certificate) => certificate.internalCertificates,
  //   )
  //   @JoinColumn({ name: 'certificado_id' })
  //   certificate: Certificate;

  @ManyToOne(() => Student, (student) => student.ownCertificates)
  @JoinColumn({ name: 'estudiante_id' })
  student: Student;
}
