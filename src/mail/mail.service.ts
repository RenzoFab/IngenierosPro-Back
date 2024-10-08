import { CompanyService } from './../company/company/company.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Company } from 'src/company/company/entities/company.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private dataSource: DataSource,
    private companyService: CompanyService,
  ) {}

  async sendEmailCode(companyId: number, email: string, code: string) {
    try {
      const transport = await this.getCompanyTransport(companyId);
      await this.mailerService.sendMail({
        to: email,
        template: 'email-code',
        transporterName: transport.name,
        from: transport.from,
        subject: `Código de verificación a ${transport.companyName}`,
        context: {
          code,
          companyImage: transport.image,
        },
      });
      console.log(`Correo enviado a ${email} de ${transport.companyName}`);
    } catch (error) {
      console.error(`Error al enviar el correo a ${email}:`, error);
      throw new Error(`No se pudo enviar el correo: ${error.message}`);
    }
  }

  private async getCompanyTransport(companyId: number) {
    const company = await this.companyService.findOne(companyId);
    switch (company.prefix) {
      case 'ECO':
        return {
          name: 'eco',
          from: process.env.ECO_USER_SMTP,
          companyName: company.name,
          image: company.logo,
        };
      case 'GHA':
        return {
          name: 'gha',
          from: process.env.GHA_USER_SMTP,
          companyName: company.name,
          image: company.logo,
        };
      case 'ACM':
        return {
          name: 'acm',
          from: process.env.ACM_USER_SMTP,
          companyName: company.name,
          image: company.logo,
        };
      case 'AGR':
        return {
          name: 'agr',
          from: process.env.AGR_USER_SMTP,
          companyName: company.name,
          image: company.logo,
        };
    }
  }
}
