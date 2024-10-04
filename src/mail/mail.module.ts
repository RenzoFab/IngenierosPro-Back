import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { mailConfig } from 'src/config';
import { CompanyModule } from 'src/company/company/company.module';

@Module({
  imports: [mailConfig(), CompanyModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
