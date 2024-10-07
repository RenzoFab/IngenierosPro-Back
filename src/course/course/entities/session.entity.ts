import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Module } from './module.entity';

@Entity('tbl_sesion')
export class Session {
  @PrimaryGeneratedColumn({
    name: 'sesion_id',
  })
  id: number;

  @Column({
    name: 'sesion_orden',
    type: 'int',
  })
  order: number;

  @Column({
    name: 'sesion_nombre',
    type: 'varchar',
    length: 500,
  })
  name: string;

  @Column({
    name: 'sesion_comentario',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  comment: string | null;

  @Column({
    name: 'sesion_duracion',
    type: 'time',
    nullable: true,
  })
  duration: string | null;

  @Column({
    name: 'sesion_url_video',
    type: 'varchar',
    length: 500,
  })
  videoUrl: string;

  @Column({
    name: 'sesion_fecha_inicio',
    type: 'date',
    nullable: true,
  })
  startDate: Date | null;

  @Column({
    name: 'sesion_hora_inicio',
    type: 'time',
    nullable: true,
  })
  startTime: string | null;

  @Column({
    name: 'sesion_hora_fin',
    type: 'time',
    nullable: true,
  })
  endTime: string | null;

  @Column({
    name: 'sesion_estado',
    type: 'tinyint',
    default: 1,
  })
  state: number;

  @Column({
    name: 'sesion_tipo',
    type: 'varchar',
    length: 7,
  })
  type: string;

  @Column({ name: 'modulo_id' })
  moduleId: number;

  @ManyToOne(() => Module, (module) => module.sessions)
  @JoinColumn({ name: 'modulo_id' })
  module: Module;

  // ! NO SE USA
  // @Column({
  //   name: 'sesion_reprogramacion',
  //   type: 'tinyint',
  //   default: 0,
  // })
  // rescheduled: number;

  // ! NO SE USA
  // @Column({
  //   name: 'sesion_resumen',
  //   type: 'varchar',
  //   length: 10000,
  //   nullable: true,
  // })
  // summary: string | null;
}
