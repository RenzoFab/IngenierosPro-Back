import { InjectRepository } from '@nestjs/typeorm';
import { FindSaleDto } from './dto/find-sale.dto';
import { Injectable } from '@nestjs/common';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale) private saleRepository: Repository<Sale>,
  ) {}

  async findAll({ studentId }: FindSaleDto) {
    return await this.saleRepository.find({
      select: {
        id: true,
        currency: true,
        date: true,
        paymentDate: true,
        priceTotal: true,
        pricePEN: true,
        priceUSD: true,
      },
      where: { studentId, status: 1 },
    });
  }

  async findOne(id: number) {
    return await this.saleRepository.findOneBy({ id, status: 1 });
  }
}
