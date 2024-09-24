import { Module } from 'src/course/module/entities/module.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('tbl_entregables')
export class Task {
  @PrimaryGeneratedColumn({ name: 'entregable_id' })
  id: number;

  @Column({
    name: 'entregable_nombre',
    type: 'varchar',
    length: 600,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'entregable_instruccion',
    type: 'varchar',
    length: 600,
    nullable: false,
  })
  instruction: string;

  @Column({
    name: 'entregable_guia',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  guide: string;

  @Column({
    name: 'entregable_fecha_limite',
    type: 'datetime',
    nullable: false,
  })
  deadline: Date;

  @Column({
    name: 'entregable_estado',
    type: 'tinyint',
    width: 1,
    nullable: false,
  })
  status: number;

  @Column({ name: 'modulo_id' })
  moduleId: number;

  @ManyToOne(() => Module, (module) => module.task)
  @JoinColumn({ name: 'modulo_id' })
  module: Module;
}
