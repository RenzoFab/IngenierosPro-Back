import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Course } from './course.entity';

@Entity('tbl_categoriacurso')
export class Category {
  @PrimaryGeneratedColumn({ type: 'tinyint' })
  categoria_curso_id: number;

  @Column({ type: 'varchar', length: 100 })
  categoria_curso_nombre: string;

  @Column({ type: 'tinyint', default: 1 })
  categoria_curso_estado: number;

  @ManyToOne(() => Course, (course) => course.categoria)
  @JoinColumn({ name: 'institucion_id' })
  cursos: Course[];
}
