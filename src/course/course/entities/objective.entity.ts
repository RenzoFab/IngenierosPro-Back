import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectiveType } from '../enum/objective.enum';

@Entity('tbl_objetivo')
export class Objective {
  @PrimaryGeneratedColumn({ name: 'objetivo_id' })
  id: number;

  @Column({
    name: 'objetivo_descripcion',
    type: 'varchar',
    length: 500,
    charset: 'utf8mb3',
    collation: 'utf8mb3_general_ci',
  })
  description: string;

  @Column({ name: 'curso_paquete_id', type: 'int' })
  productId: number;

  @Column({ name: 'tipo_objetivo', type: 'varchar', length: 20 })
  objectiveType: ObjectiveType;
}
