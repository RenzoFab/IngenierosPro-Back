import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tlb_curso')
export class Course {
  @PrimaryGeneratedColumn({ name: 'curso_id' })
  id: number;

  @Column({ name: 'curso_codigo', type: 'varchar', length: 20, nullable: true })
  codigo: string;

  @Column({ name: 'curso_nombre', type: 'varchar', length: 200 })
  nombre: string;

  @Column({ name: 'curso_descripcion', type: 'varchar', length: 1000 })
  descripcion: string;

  @Column({ name: 'curso_dificultad', type: 'varchar', length: 20 })
  dificultad: string;

  @Column({ name: 'curso_horas_certificado', type: 'int' })
  horasCertificado: number;

  @Column({ name: 'curso_precio_soles', type: 'float' })
  precioSoles: number;

  @Column({ name: 'curso_precio_soles_antes', type: 'float' })
  precioSolesAntes: number;

  @Column({ name: 'curso_precio_dolar', type: 'float' })
  precioDolar: number;

  @Column({ name: 'curso_precio_dolar_antes', type: 'float' })
  precioDolarAntes: number;

  @Column({ name: 'curso_imagen', type: 'varchar', length: 1000 })
  imagen: string;

  @Column({
    name: 'curso_video_introductorio',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  videoIntroductorio: string;

  @Column({
    name: 'curso_fecha_creacion',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @Column({ name: 'curso_fecha_fin', type: 'datetime' })
  fechaFin: Date;

  @Column({ name: 'curso_fecha_inicio_publicacion', type: 'datetime' })
  fechaInicioPublicacion: Date;

  @Column({ name: 'curso_fecha_fin_publicacion', type: 'datetime' })
  fechaFinPublicacion: Date;

  @Column({ name: 'curso_estado', type: 'varchar', length: 15 })
  estado: string;

  @Column({ name: 'curso_tiempo_acceso', type: 'int' })
  tiempoAcceso: number;

  @Column({
    name: 'curso_plantilla_certificado',
    type: 'varchar',
    length: 1000,
  })
  plantillaCertificado: string;

  @Column({
    name: 'curso_descripcion_certificado',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  descripcionCertificado: string;

  @Column({ name: 'curso_numero_inscritos', type: 'int' })
  numeroInscritos: number;

  @Column({ name: 'curso_tipo', type: 'varchar', length: 10 })
  tipo: string;

  @Column({ name: 'curso_modalidad', type: 'varchar', length: 12 })
  modalidad: string;

  @Column({
    name: 'curso_brochure',
    type: 'varchar',
    length: 600,
    nullable: true,
  })
  brochure: string;

  @Column({ name: 'curso_fecha_inicio', type: 'datetime', nullable: true })
  fechaInicio: Date;

  @Column({
    name: 'curso_duracion',
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  duracion: string;

  @Column({
    name: 'perfil_alumno',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  perfilAlumno: string;

  @Column({
    name: 'curso_portada',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  portada: string;

  @Column({
    name: 'curso_link_whatsaap_grupo',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  linkWhatsappGrupo: string;

  @Column({
    name: 'curso_tipo_reproductor',
    type: 'varchar',
    length: 15,
    nullable: true,
  })
  tipoReproductor: string;

  // Relaciones Many-to-One (Foreign Keys)

  //   @ManyToOne(() => Institucion, (institucion) => institucion.cursos)
  //   institucion: Institucion;

  //   @ManyToOne(() => CategoriaCurso, (categoria) => categoria.cursos)
  //   categoriaCurso: CategoriaCurso;

  //   @ManyToOne(() => Docente, (docente) => docente.cursos)
  //   docente: Docente;

  //   @ManyToOne(() => Tutor, (tutor) => tutor.cursos)
  //   tutor: Tutor;
}
