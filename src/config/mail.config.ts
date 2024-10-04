import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export function mailConfig() {
  return MailerModule.forRootAsync({
    useFactory: () => {
      return {
        transport: {
          pool: true,
          rateLimit: 5,
        },
        transports: {
          eco: {
            name: 'eco',
            host: process.env.ECO_HOST_SMTP,
            port: 465,
            secure: true,
            auth: {
              user: process.env.ECO_USER_SMTP,
              pass: process.env.ECO_PASS_SMTP,
            },
          },
          acm: {
            name: 'acm',
            host: process.env.ACM_HOST_SMTP,
            port: 465,
            secure: true,
            auth: {
              user: process.env.ACM_USER_SMTP,
              pass: process.env.ACM_PASS_SMTP,
            },
          },
          gha: {
            name: 'gha',
            host: process.env.GHA_HOST_SMTP,
            port: 465,
            secure: true,
            auth: {
              user: process.env.GHA_USER_SMTP,
              pass: process.env.GHA_PASS_SMTP,
            },
          },
          agr: {
            name: 'agr',
            host: process.env.AGR_HOST_SMTP,
            port: 465,
            secure: true,
            auth: {
              user: process.env.AGR_USER_SMTP,
              pass: process.env.AGR_PASS_SMTP,
            },
          },
        },
        template: {
          dir: join(__dirname, '../mail/templates'),
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        },
      };
    },
  });
}
