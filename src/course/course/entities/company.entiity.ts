import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Course } from './course.entity';

@Entity('tbl_institucion')
export class Company {
  @PrimaryGeneratedColumn()
  institucion_id: number;

  @Column({ type: 'varchar', length: 100 })
  institucion_nombre: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  institucion_nombre_completo: string;

  @Column({ type: 'varchar', length: 500 })
  institucion_descripcion: string;

  @Column({ type: 'varchar', length: 45 })
  institucion_telefono: string;

  @Column({ type: 'varchar', length: 45 })
  institucion_correo: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  institucion_logo: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  institucion_logo_grises: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  institucion_logo_solo: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  institucion_slogan: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  institucion_mision: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  institucion_vision: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  institucion_vista_certificado: string;

  @Column({ type: 'tinyint' })
  institucion_estado: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  institucion_imagen_referencial: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  institucion_facebook: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  institucion_telefono_secundario: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  institucion_instagram: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  institucion_whatsapp: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  institucion_tiktok: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  institucion_correo_soporte: string;

  @Column({ type: 'varchar', length: 5, nullable: true })
  institucion_prefijo: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  institucion_telefono_soporte: string;

  @Column({ type: 'int', nullable: true })
  autor_id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  institucion_autor_rol: string;

  @OneToMany(() => Course, (course) => course.institucion)
  cursos: Course[];
}
