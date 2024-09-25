import { Company } from 'src/company/company/entities/company.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tbl_certificado_link')
export class ExternalCertificate {
  @PrimaryGeneratedColumn({ name: 'certificado_link_id' })
  certificateLinkId: number;

  @Column({ name: 'certificado_link_fecha_emision', type: 'datetime' })
  issueDate: Date;

  @Column({ name: 'usuario_nombres', length: 700 })
  userName: string;

  @Column({ name: 'usuario_carnet_identidad', length: 100 })
  userIdentityCard: string;

  @Column({ name: 'usuario_imagen', length: 1000, nullable: true })
  userImage: string;

  @Column({ name: 'certificado_link_horas_certificacion', type: 'int' })
  certificationHours: number;

  @Column({ name: 'certificado_link_url', length: 1000 })
  certificationUrl: string;

  @Column({ name: 'tipo_certificado_nombre', length: 400 })
  certificateTypeName: string;

  @Column({ name: 'tipo_certificado_logo', length: 1000, nullable: true })
  certificateTypeLogo: string;

  @Column({ name: 'certificado_link_nota', type: 'float' })
  certificationGrade: number;

  @Column({
    name: 'certificado_link_visualizacion',
    type: 'tinyint',
    default: 1,
  })
  visualizationStatus: boolean;

  @Column({ name: 'tipo_servicio', length: 100 })
  serviceType: string;

  @Column({ name: 'servicio_nombre', length: 5000 })
  serviceName: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'institucion_id' })
  company: Company;
}
