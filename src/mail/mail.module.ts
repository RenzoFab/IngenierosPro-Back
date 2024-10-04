import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { mailConfig } from 'src/config';

@Module({
  imports: [mailConfig()],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
