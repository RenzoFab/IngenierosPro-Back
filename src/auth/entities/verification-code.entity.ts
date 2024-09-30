import { Company } from 'src/company/company/entities/company.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('tbl_codigo_verificacion')
export class VerificationCode {
  @PrimaryGeneratedColumn({ name: 'codigo_id' })
  codeId: number;

  @Column({
    name: 'codigo_verificacion',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  code: string;

  @Column({
    name: 'codigo_estado',
    type: 'int',
    default: 0,
  })
  status: number;

  @Column({
    name: 'codigo_correo',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  email: string;

  @Column({
    name: 'institucion_id',
    type: 'tinyint',
  })
  companyId: number;

  @ManyToOne(() => Company, (company) => company.verificationCode)
  @JoinColumn({ name: 'institucion_id' })
  company: Company;
}
