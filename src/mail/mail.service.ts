import { MailerService } from '@nestjs-modules/mailer';

export class MailService {
  constructor(private readonly mailserService: MailerService) {}

  async sendEmailCode(email: string) {
    await this.mailserService.sendMail({
      to: email,
      template: './templates/email-code',
    });
  }
}
