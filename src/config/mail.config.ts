import { MailerModule } from '@nestjs-modules/mailer';

export function mailConfig() {
  return MailerModule.forRoot({
    transport: {
      pool: true,
      rateLimit: 5,
    },
    transports: {
      eco: {
        host: process.env.ECO_HOST_SMTP,
        port: 465,
        secure: true,
        auth: {
          user: process.env.ECO_USER_SMTP,
          pass: process.env.ECO_PASS_SMTP,
        },
      },
      acm: {
        host: process.env.ACM_HOST_SMTP,
        port: 465,
        secure: true,
        auth: {
          user: process.env.ACM_USER_SMTP,
          pass: process.env.ACM_PASS_SMTP,
        },
      },
      gha: {
        host: process.env.GHA_HOST_SMTP,
        port: 465,
        secure: true,
        auth: {
          user: process.env.GHA_USER_SMTP,
          pass: process.env.GHA_PASS_SMTP,
        },
      },
      agr: {
        host: process.env.AGR_HOST_SMTP,
        port: 465,
        secure: true,
        auth: {
          user: process.env.AGR_USER_SMTP,
          pass: process.env.AGR_PASS_SMTP,
        },
      },
    },
  });
}
