import { InjectRepository } from '@nestjs/typeorm';
import { FindSaleDto } from './dto/find-sale.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale) private saleRepository: Repository<Sale>,
  ) {}

  async findAll({
    studentId,
    status,
  }: FindSaleDto & { studentId: number }): Promise<Partial<Sale>[]> {
    return await this.saleRepository.find({
      select: {
        id: true,
        currency: true,
        date: true,
        paymentDate: true,
        priceTotal: true,
        pricePEN: true,
        priceUSD: true,
        status: true,
      },
      where: { studentId, status },
    });
  }

  async findOne(id: number, studentId: number): Promise<Partial<Sale>> {
    const sale = await this.saleRepository.findOne({
      select: {
        id: true,
        currency: true,
        date: true,
        paymentDate: true,
        priceTotal: true,
        pricePEN: true,
        priceUSD: true,
        status: true,
      },
      where: {
        id,
        status: 1,
        studentId,
      },
    });
    if (!sale) throw new NotFoundException(`Compra con id ${id} no encontrado`);
    return sale;
  }
}
