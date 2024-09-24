import { Company } from 'src/company/company/entities/company.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tbl_banner')
export class Banner {
  @PrimaryGeneratedColumn({ name: 'banner_id' })
  id: number;

  @Column({
    name: 'banner_imagen',
    type: 'varchar',
    length: 1000,
    nullable: false,
  })
  image: string;

  @Column({
    name: 'banner_imagen_movil',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  mobileImage: string | null;

  @Column({
    name: 'banner_descripcion',
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  description: string;

  @Column({ name: 'banner_tipo', type: 'varchar', length: 30, nullable: false })
  type: string;

  @Column({ name: 'institucion_id', type: 'tinyint', nullable: false })
  companyId: number;

  @ManyToOne(() => Company, (company) => company.banners)
  @JoinColumn({ name: 'institucion_id' })
  company: Company;
}
