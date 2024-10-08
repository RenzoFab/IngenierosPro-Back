import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Module } from './module.entity';

@Entity('tbl_materiales')
export class Material {
  @PrimaryGeneratedColumn({ name: 'material_id' })
  id: number;

  @Column({
    name: 'material_nombre',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  name: string;

  @Column({
    name: 'material_url',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  url: string;

  @Column({ name: 'material_estado', type: 'tinyint', default: 1 })
  state: number;

  @Column({ name: 'modulo_id' })
  moduleId: number;

  @ManyToOne(() => Module, (module) => module.materials)
  @JoinColumn({ name: 'modulo_id' })
  module: Module;
}
