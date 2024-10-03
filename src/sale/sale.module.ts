import { Sale } from './entities/sale.entity';
import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { SaleDetail } from './entities/sale-detail.entity';

@Module({
  controllers: [SaleController],
  providers: [SaleService],
  imports: [TypeOrmModule.forFeature([Sale, SaleDetail]), AuthModule],
  exports: [TypeOrmModule],
})
export class SaleModule {}
