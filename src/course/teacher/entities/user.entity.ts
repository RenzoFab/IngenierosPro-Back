import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teacher } from './teacher.entity';
import { Student } from './student.entity';

@Entity('tbl_usuario')
export class User {
  @PrimaryGeneratedColumn({ name: 'usuario_id' })
  id: number;

  @Column({ name: 'usuario_nombres', type: 'varchar', length: 150 })
  firstName: string;

  @Column({ name: 'usuario_apellidos', type: 'varchar', length: 150 })
  lastName: string;

  @Column({ name: 'usuario_fecha_nacimiento', type: 'date', nullable: true })
  birthDate: Date;

  @Column({ name: 'usuario_correo', type: 'varchar', length: 200 })
  email: string;

  @Column({ name: 'usuario_telefono', type: 'varchar', length: 30 })
  phone: string;

  @Column({
    name: 'usuario_usuario',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  username: string;

  @Column({
    name: 'usuario_clave',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  password: string;

  @Column({
    name: 'usuario_imagen',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  image: string;

  @Column({ name: 'usuario_estado', type: 'tinyint', default: 1 })
  status: number;

  @Column({ name: 'usuario_pais', type: 'varchar', length: 30, nullable: true })
  country: string;

  @Column({ name: 'usuario_pais_origen', type: 'varchar', length: 30 })
  countryOfOrigin: string;

  @Column({ name: 'usuario_carnet_identidad', type: 'varchar', length: 100 })
  idCard: string;

  @Column({
    name: 'usuario_ocupacion',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  occupation: string;

  @Column({
    name: 'usuario_genero',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  gender: string;

  @Column({
    name: 'usuario_gradoacademico',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  academicDegree: string;

  @Column({
    name: 'usuario_codigo_activacion',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  activationCode: string;

  @Column({ name: 'usuario_codigo_verificado', type: 'tinyint', default: 0 })
  isVerified: boolean;

  @Column({
    name: 'usuario_fecha_creacion',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ name: 'usuario_estado_nombre', type: 'tinyint', default: 0 })
  nameStatus: boolean;

  //   @Column({
  //     name: 'usuario_codigo_telefono',
  //     type: 'varchar',
  //     length: 20,
  //     nullable: true,
  //   })
  //   phoneCode: string;

  //   @Column({ name: 'usuario_estado_telefono', type: 'int', default: 0 })
  //   phoneStatus: number;

  //   @Column({
  //     name: 'usuario_tipo',
  //     type: 'varchar',
  //     length: 45,
  //     default: 'Normal',
  //   })
  //   type: string;

  @Column({ name: 'usuario_estado_carnet_identidad', type: 'int', default: 0 })
  idCardStatus: number;

  @OneToOne(() => Teacher, (teacher) => teacher.user)
  teachers: Teacher[];

  @OneToOne(() => Student, (student) => student.user)
  @JoinColumn({ name: 'usuario_id' })
  student: Student;

  //   @ManyToOne(() => Role, (role) => role.users)
  //   @JoinColumn({ name: 'rol_id' })
  //   role: Role;
}
