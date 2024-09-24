import { Company } from 'src/company/company/entities/company.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';

@Entity('tbl_convenio')
export class Agreement {
  @PrimaryGeneratedColumn({ name: 'convenio_id' })
  id: number;

  @Column({
    name: 'convenio_nombre',
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    name: 'convenio_imagen',
    type: 'varchar',
    length: 1000,
  })
  image: string;

  @Column({ name: 'convenio_estado', type: 'tinyint', default: 1 })
  state: number;

  @Column({ name: 'institucion_id', type: 'tinyint', nullable: false })
  companyId: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'institucion_id' })
  company: Company;
}
