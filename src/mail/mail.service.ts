import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailCode(email: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        template: 'email-code',
        transporterName: 'eco',
        from: 'noreply@ecoambientalgroup.com',
        subject: 'Bienvenido a IngenieroPro',
      });
      console.log(`Correo enviado a ${email}`);
    } catch (error) {
      console.error(`Error al enviar el correo a ${email}:`, error);
      // Puedes lanzar un error o manejarlo de otra manera
      throw new Error(`No se pudo enviar el correo: ${error.message}`);
    }
  }
}
