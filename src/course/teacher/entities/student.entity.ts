import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Entity,
  OneToMany,
} from 'typeorm';
import { User } from '../../../auth/entities/user.entity';
import { Company } from 'src/company/company/entities/company.entity';
import { OwnCertificate } from 'src/certificate/own-certificate/entities/own-certificate.entity';

@Entity('tbl_estudiante')
export class Student {
  @PrimaryGeneratedColumn({ name: 'estudiante_id' })
  studentId: number;

  @Column({
    name: 'estudiante_carrera',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  career: string;

  @Column({ name: 'estudiante_publicidad', type: 'tinyint' })
  advertising: boolean;

  @Column({ name: 'estudiante_cantidad_curso', type: 'int', nullable: true })
  courseCount: number;

  @Column({
    name: 'estudiante_tipo',
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  type: string;

  @ManyToOne(() => Company, (company) => company.students)
  @JoinColumn({ name: 'institucion_id' })
  company: Company;

  @OneToOne(() => User, (user) => user.student)
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @OneToMany(() => OwnCertificate, (ownCertificate) => ownCertificate.student)
  ownCertificates: OwnCertificate[];
}
