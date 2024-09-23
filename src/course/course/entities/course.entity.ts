import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './company.entiity';
import { Category } from './category.entity';

export enum CourseState {
  Activo = 'Activo',
  Pendiente = 'Pendiente',
  Cancelado = 'Cancelado',
}

export enum CourseType {
  Pagado = 'Pagado',
  Gratuito = 'Gratuito',
}

export enum CourseModality {
  Asincrónico = 'Asincrónico',
  Vivo = 'Vivo',
  Mixto = 'Mixto',
}

export enum CourseDifficulty {
  Básico = 'Básico',
  Intermedio = 'Intermedio',
  Avanzado = 'Avanzado',
}

@Entity('tbl_curso')
export class Course {
  @PrimaryGeneratedColumn()
  curso_id: number;

  //! NO SE USA
  // @Column({ type: 'varchar', length: 20, nullable: true })
  // curso_codigo: string;

  @Column({ type: 'varchar', length: 200 })
  curso_nombre: string;

  @Column({ type: 'varchar', length: 1000 })
  curso_descripcion: string;

  @Column({ type: 'enum', enum: CourseDifficulty })
  curso_dificultad: CourseDifficulty;

  @Column({ type: 'int' })
  curso_horas_certificado: number;

  @Column({ type: 'float' })
  curso_precio_soles: number;

  @Column({ type: 'float' })
  curso_precio_soles_antes: number;

  @Column({ type: 'float' })
  curso_precio_dolar: number;

  @Column({ type: 'float' })
  curso_precio_dolar_antes: number;

  @Column({ type: 'varchar', length: 1000 })
  curso_imagen: string;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  curso_video_introductorio: string;

  //! NO SE USA
  // @Column({
  //   type: 'datetime',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // curso_fecha_creacion: Date;

  @Column({ type: 'datetime' })
  curso_fecha_fin: Date;

  @Column({ type: 'datetime' })
  curso_fecha_inicio_publicacion: Date;

  @Column({ type: 'datetime' })
  curso_fecha_fin_publicacion: Date;

  @Column({
    type: 'enum',
    enum: CourseState,
    default: CourseState.Pendiente,
  })
  curso_estado: CourseState;

  @Column({ type: 'int' })
  curso_tiempo_acceso: number;

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

  @Column({ type: 'int' })
  curso_numero_inscritos: number;

  @Column({ type: 'enum', enum: CourseType })
  curso_tipo: CourseType;

  @Column({ type: 'enum', enum: CourseModality })
  curso_modalidad: CourseModality;

  @Column({
    type: 'varchar',
    length: 600,
    nullable: true,
  })
  curso_brochure: string;

  @Column({ type: 'datetime', nullable: true })
  curso_fecha_inicio: Date;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  curso_duracion: string;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  perfil_alumno: string;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  curso_portada: string;

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

  @Column()
  institucion_id: number;

  @Column()
  categoria_curso_id: number;

  @ManyToOne(() => Company, (company) => company.cursos)
  @JoinColumn({ name: 'institucion_id' })
  institucion: Company;

  @ManyToOne(() => Category, (category) => category.cursos)
  @JoinColumn({ name: 'categoria_curso_id' })
  categoria: Category;
}
