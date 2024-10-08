import { Company } from 'src/company/company/entities/company.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../../auth/entities/user.entity';
import { Course } from 'src/course/course/entities/course.entity';
import { Enrollment } from 'src/course/course/entities/enrollment.entity';

@Entity('tbl_docente')
export class Teacher {
  @PrimaryGeneratedColumn({ name: 'docente_id' })
  id: number;

  @Column({ name: 'docente_descripcion', type: 'varchar', length: 7000 })
  description: string;

  @Column({
    name: 'docente_linkedin',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  linkedin: string;

  @Column({
    name: 'docente_youtube',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  youtube: string;

  @Column({
    name: 'docente_instagram',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  instagram: string;

  //   @Column({
  //     name: 'docente_permiso_crear_cupon',
  //     type: 'tinyint',
  //     nullable: true,
  //   })
  //   canCreateCoupon: boolean;

  @OneToOne(() => User, (user) => user.teacher)
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @OneToMany(() => Enrollment, (Enrollment) => Enrollment.teacher)
  enrollments: Enrollment[];

  @OneToMany(() => Course, (course) => course.teacher)
  courses: Course[];

  @ManyToOne(() => Company, (company) => company.teachers)
  @JoinColumn({ name: 'institucion_id' })
  company: Company;
}
