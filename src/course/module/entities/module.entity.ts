import { Course } from 'src/course/course/entities/course.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ModuleStatus } from '../enum/module.enum';
import { Session } from 'src/course/session/entities/session.entity';

@Entity('tbl_modulo')
export class Module {
  @PrimaryGeneratedColumn({ name: 'modulo_id' })
  id: number;

  @Column({ type: 'int', name: 'modulo_orden' })
  order: number;

  @Column({ type: 'varchar', length: 2000, name: 'modulo_nombre' })
  name: string;

  @Column({ type: 'datetime', nullable: true, name: 'modulo_fecha_inicio' })
  startDate: Date;

  @Column({
    type: 'tinyint',
    default: ModuleStatus.Active,
    name: 'modulo_estado',
    enum: ModuleStatus,
  })
  state: ModuleStatus;

  @Column({ name: 'curso_id' })
  courseId: number;

  @ManyToOne(() => Course, (course) => course.modules)
  @JoinColumn({ name: 'curso_id' })
  course: Course;

  @OneToMany(() => Session, (session) => session.module)
  sessions: Session[];
}
