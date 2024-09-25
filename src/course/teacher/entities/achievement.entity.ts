import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AchievementType } from '../enum/achievement.enum';

@Entity('tbl_logros')
export class Achievement {
  @PrimaryGeneratedColumn({ name: 'logro_id' })
  id: number;

  @Column({
    name: 'logro_descripcion',
    type: 'varchar',
    length: 1000,
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci',
  })
  description: string;

  @Column({
    name: 'tipo_logro',
    type: 'varchar',
    length: 45,
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci',
  })
  type: AchievementType;

  @Column({ name: 'tipo_usuario_id', type: 'int' })
  userTypeId: number;
}
