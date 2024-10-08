import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Course } from './course.entity';
import {
  EnrollmentAcces,
  EnrollmentPackageType,
  EnrollmentState,
} from '../enum/enrollment.enum';
import { Student } from 'src/auth/entities';
import { Teacher } from 'src/course/teacher/entities/teacher.entity';
import { SaleDetail } from 'src/sale/sale/entities/sale-detail.entity';

@Entity('tbl_matricula')
export class Enrollment {
  @PrimaryGeneratedColumn({ name: 'matricula_id' }) // Nombre de la columna en la BD
  id: number;

  @Column({
    type: 'datetime',
    name: 'matricula_fecha_inscripcion',
    default: () => 'CURRENT_TIMESTAMP',
  })
  enrollmentDate: Date;

  @Column({ type: 'datetime', name: 'matricula_fecha_inicio_acceso' })
  accessStartDate: Date;

  @Column({ type: 'datetime', name: 'matricula_fecha_fin_acceso' })
  accessEndDate: Date;

  @Column({ type: 'tinyint', name: 'matricula_estado' })
  status: EnrollmentState;

  @Column({
    type: 'double',
    name: 'matricula_valoracion_curso',
    nullable: true,
  })
  courseRating: number;

  @Column({ type: 'int', name: 'matricula_valoracion_docente', nullable: true })
  teacherRating: number;

  @Column({ type: 'int', name: 'matricula_valoracion_tutor', nullable: true })
  tutorRating: number;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'curso_id' }) // Referencia a la columna curso_id
  course: Course;

  @Column({
    type: 'varchar',
    length: 500,
    name: 'matricula_valoracion_comentario',
    nullable: true,
  })
  ratingComment: string;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 2,
    name: 'matricula_progreso',
    nullable: true,
  })
  progress: number;

  @Column({
    type: 'tinyint',
    name: 'matricula_comentario_aprobacion',
    default: 1,
  })
  approvalComment: number;

  @Column({ type: 'int', name: 'matricula_id_paquete', nullable: true })
  packageId: number;

  @Column({ type: 'tinyint', name: 'matricula_tipo_paquete', nullable: true })
  packageType: EnrollmentPackageType;

  @Column({ type: 'float', name: 'matricula_nota_promedio', nullable: true })
  averageScore: number;

  @Column({
    type: 'tinyint',
    name: 'matricula_desea_certificado',
    nullable: true,
  })
  wantsCertificate: number;

  @Column({ type: 'tinyint', name: 'matricula_acceso_estudiante', default: 1 })
  studentAccess: EnrollmentAcces;

  @Column({
    type: 'tinyint',
    name: 'matricula_acceso_actualizador',
    default: 0,
  })
  updaterAccess: number;

  @Column({
    type: 'datetime',
    name: 'matricula_fecha_finalizacion',
    nullable: true,
  })
  completionDate: Date;

  @OneToOne(() => SaleDetail, (saleDetail) => saleDetail)
  @JoinColumn({ name: 'detalleventa_id' })
  saleDetail: SaleDetail;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'estudiante_id' })
  student: Student;

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: 'docente_id' })
  teacher: Teacher;
}
