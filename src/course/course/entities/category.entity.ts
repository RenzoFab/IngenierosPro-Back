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
  @PrimaryGeneratedColumn({ name: 'categoria_curso_id', type: 'tinyint' })
  id: number;

  @Column({ name: 'categoria_curso_estado', type: 'tinyint', default: 1 })
  state: number;

  @Column({ name: 'categoria_curso_nombre', type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => Course, (course) => course.category)
  @JoinColumn({ name: 'institucion_id' })
  courses: Course[];
}
