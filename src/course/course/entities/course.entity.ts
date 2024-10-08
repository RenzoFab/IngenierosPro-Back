import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  CourseDifficulty,
  CourseState,
  CourseType,
  CourseModality,
} from '../enum/course.enum';
import { Company } from 'src/company/company/entities/company.entity';
import { Teacher } from 'src/course/teacher/entities/teacher.entity';
import { Category } from './category.entity';
import { Module } from './module.entity';

@Entity('tbl_curso')
export class Course {
  @PrimaryGeneratedColumn({ name: 'curso_id' })
  id: number;

  @Column({
    name: 'curso_estado',
    type: 'enum',
    enum: CourseState,
    default: CourseState.Pendiente,
  })
  state: CourseState;

  @Column({
    name: 'curso_nombre',
    type: 'varchar',
    length: 200,
  })
  name: string;

  @Column({
    name: 'curso_descripcion',
    type: 'varchar',
    length: 1000,
  })
  description: string;

  @Column({
    name: 'perfil_alumno',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  studentProfile: string;

  @Column({
    name: 'curso_brochure',
    type: 'varchar',
    length: 600,
    nullable: true,
  })
  brochure: string;

  @Column({
    name: 'curso_horas_certificado',
    type: 'int',
  })
  certifiedHours: number;

  @Column({
    name: 'curso_dificultad',
    type: 'enum',
    enum: CourseDifficulty,
  })
  difficulty: CourseDifficulty;

  @Column({
    name: 'curso_tipo',
    type: 'enum',
    enum: CourseType,
  })
  type: CourseType;

  @Column({ name: 'curso_modalidad', type: 'enum', enum: CourseModality })
  modality: CourseModality;

  @Column({
    name: 'curso_precio_soles',
    type: 'float',
  })
  pricePen: number;

  @Column({
    name: 'curso_precio_soles_antes',
    type: 'float',
  })
  pricePenBefore: number;

  @Column({
    name: 'curso_precio_dolar',
    type: 'float',
  })
  priceUsd: number;

  @Column({
    name: 'curso_precio_dolar_antes',
    type: 'float',
  })
  priceUsdBefore: number;

  @Column({
    name: 'curso_imagen',
    type: 'varchar',
    length: 1000,
  })
  image: string;

  @Column({
    name: 'curso_portada',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  coverImage: string;

  @Column({
    name: 'curso_video_introductorio',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  video: string;

  @Column({
    name: 'curso_fecha_inicio',
    type: 'datetime',
    nullable: true,
  })
  startDate: Date;

  @Column({
    name: 'curso_fecha_fin',
    type: 'datetime',
  })
  endDate: Date;

  @Column({
    name: 'curso_fecha_inicio_publicacion',
    type: 'datetime',
  })
  publicationStartDate: Date;

  @Column({
    name: 'curso_fecha_fin_publicacion',
    type: 'datetime',
  })
  publicationEndDate: Date;

  @Column({
    name: 'curso_duracion',
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  duration: string;

  @Column({ name: 'curso_tiempo_acceso', type: 'int' })
  accessTime: number;

  @Column({
    name: 'curso_numero_inscritos',
    type: 'int',
  })
  totalStudents: number;

  @Column({ name: 'institucion_id' })
  companyId: number;

  @Column({ name: 'categoria_curso_id' })
  categoryId: number;

  @ManyToOne(() => Company, (company) => company.cursos)
  @JoinColumn({ name: 'institucion_id' })
  company: Company;

  @ManyToOne(() => Category, (category) => category.courses)
  @JoinColumn({ name: 'categoria_curso_id' })
  category: Category;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses)
  @JoinColumn({ name: 'docente_id' })
  teacher: Teacher;

  @OneToMany(() => Module, (module) => module.course)
  modules: Module[];

  //! NO SE USA
  // @Column({ type: 'varchar', length: 20, nullable: true })
  // curso_codigo: string;

  //! NO SE USA
  // @Column({
  //   type: 'datetime',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // curso_fecha_creacion: Date;

  // //! NO SE USA
  // @Column({
  //   type: 'varchar',
  //   length: 1000,
  // })
  // curso_plantilla_certificado: string;

  //! NO SE USA
  // @Column({
  //   type: 'varchar',
  //   length: 200,
  //   nullable: true,
  // })
  // curso_descripcion_certificado: string;

  //! NO SE USA
  // @Column({
  //   type: 'varchar',
  //   length: 300,
  //   nullable: true,
  // })
  // curso_link_whatsaap_grupo: string;

  //! NO SE USA
  // @Column({
  //   type: 'varchar',
  //   length: 15,
  //   nullable: true,
  // })
  // curso_tipo_reproductor: string;
}
