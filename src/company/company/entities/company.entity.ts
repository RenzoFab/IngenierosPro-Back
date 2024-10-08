import { Agreement } from 'src/company/agreement/entities/agreement.entity';
import { Banner } from 'src/company/banner/entities/banner.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CompanyStatus } from '../enum/company.enum';
import { Teacher } from 'src/course/teacher/entities/teacher.entity';
import { ExternalCertificate } from 'src/certificate/external-certificate/entities/external-certificate.entity';
import { VerificationCode } from 'src/auth/entities/verification-code.entity';
import { Student } from 'src/auth/entities/student.entity';
import { Course } from 'src/course/course/entities';
import { Coupon } from 'src/sale/coupon/entities/coupon.entity';

@Entity('tbl_institucion')
export class Company {
  @PrimaryGeneratedColumn({ name: 'institucion_id' })
  id: number;

  @Column({
    name: 'institucion_estado',
    type: 'tinyint',
  })
  state: CompanyStatus;

  @Column({
    name: 'institucion_nombre',
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    name: 'institucion_nombre_completo',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  fullName: string;

  @Column({
    name: 'institucion_prefijo',
    type: 'varchar',
    length: 5,
    nullable: true,
  })
  prefix: string;

  @Column({
    name: 'institucion_descripcion',
    type: 'varchar',
    length: 500,
  })
  description: string;

  @Column({
    name: 'institucion_slogan',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  slogan: string;

  @Column({
    name: 'institucion_mision',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  mission: string;

  @Column({
    name: 'institucion_vision',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  vision: string;

  @Column({
    name: 'institucion_telefono',
    type: 'varchar',
    length: 45,
  })
  phone: string;

  @Column({
    name: 'institucion_telefono_secundario',
    type: 'varchar',
    length: 15,
    nullable: true,
  })
  phoneSecondary: string;

  @Column({
    name: 'institucion_telefono_soporte',
    type: 'varchar',
    length: 15,
    nullable: true,
  })
  phoneSupport: string;

  @Column({
    name: 'institucion_correo',
    type: 'varchar',
    length: 45,
  })
  email: string;

  @Column({
    name: 'institucion_correo_soporte',
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  emailSupport: string;

  @Column({
    name: 'institucion_instagram',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  instagram: string;

  @Column({
    name: 'institucion_whatsapp',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  whatsapp: string;

  @Column({
    name: 'institucion_facebook',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  facebook: string;

  @Column({
    name: 'institucion_tiktok',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  tiktok: string;

  @Column({
    name: 'institucion_logo',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  logo: string;

  @Column({
    name: 'institucion_logo_grises',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  logoGray: string;

  @Column({
    name: 'institucion_logo_solo',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  logoIcon: string;

  // ! NO SE USA
  // @Column({
  //   name: 'institucion_vista_certificado',
  //   type: 'varchar',
  //   length: 500,
  //   nullable: true,
  // })
  // certificatePreview: string;

  // ! NO SE USA
  // @Column({
  //   name: 'institucion_imagen_referencial',
  //   type: 'varchar',
  //   length: 255,
  //   nullable: true,
  // })
  // imageReference: string;

  // ! NO SE USA
  // @Column({
  //   name: 'autor_id',
  //   type: 'int',
  //   nullable: true,
  // })
  // authorId: number;

  // ! NO SE USA
  // @Column({
  //   name: 'institucion_autor_rol',
  //   type: 'varchar',
  //   length: 50,
  //   nullable: true,
  // })
  // authorRole: string;

  @OneToMany(() => Course, (course) => course.company)
  cursos: Course[];

  @OneToMany(() => Banner, (banner) => banner.company)
  banners: Banner[];

  @OneToMany(() => Agreement, (agreement) => agreement.company)
  agreements: Agreement[];

  @OneToMany(() => Teacher, (teacher) => teacher.company)
  teachers: Teacher[];

  @OneToMany(() => Student, (student) => student.company)
  students: Student[];

  @OneToMany(
    () => ExternalCertificate,
    (externalCertificate) => externalCertificate.company,
  )
  externalCertificate: ExternalCertificate[];

  @OneToMany(
    () => VerificationCode,
    (verificationCode) => verificationCode.company,
  )
  verificationCode: VerificationCode[];

  @OneToMany(() => Coupon, (coupon) => coupon.company)
  coupons: Coupon[];
}
