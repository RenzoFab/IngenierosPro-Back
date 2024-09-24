import { Module } from '@nestjs/common';
import { AgreementService } from './agreement.service';
import { AgreementController } from './agreement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agreement } from './entities/agreement.entity';

@Module({
  controllers: [AgreementController],
  providers: [AgreementService],
  imports: [TypeOrmModule.forFeature([Agreement])],
})
export class AgreementModule {}
