import { Module } from 'src/course/module/entities/module.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('tbl_evaluacion')
export class Evaluation {
  @PrimaryGeneratedColumn({ name: 'evaluacion_id' })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'evaluacion_descripcion',
    nullable: true,
  })
  description: string;

  @Column({ type: 'int', name: 'evaluacion_intentos', nullable: false })
  attempts: number;

  @CreateDateColumn({
    type: 'datetime',
    name: 'evaluacion_fecha_creacion',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'datetime',
    name: 'evaluacion_fecha_inicio',
    nullable: false,
  })
  startDate: Date;

  @Column({ type: 'datetime', name: 'evaluacion_fecha_fin', nullable: false })
  endDate: Date;

  @Column({ type: 'time', name: 'evaluacion_duracion', nullable: false })
  duration: string;

  @Column({ type: 'tinyint', name: 'evaluacion_estado', nullable: false })
  state: number;

  @Column({ type: 'int', name: 'evaluacion_numero_preguntas', nullable: false })
  numberOfQuestions: number;

  @Column({ type: 'int', name: 'evaluacion_usuario', nullable: false })
  userId: number;

  @Column({
    type: 'varchar',
    length: 500,
    name: 'evaluacion_instruccion',
    nullable: true,
  })
  instruction: string;

  @Column({ type: 'int', name: 'modulo_id', nullable: false })
  moduleId: number;

  @ManyToOne(() => Module, (module) => module.evaluations)
  @JoinColumn({ name: 'modulo_id' })
  module: Module;
}
