import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('tbl_rol')
export class Role {
  @PrimaryGeneratedColumn({ name: 'rol_id' })
  id: number;

  @Column({ name: 'rol_nombre', type: 'varchar', length: 100 })
  name: string;

  @Column({
    name: 'rol_descripcion',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
