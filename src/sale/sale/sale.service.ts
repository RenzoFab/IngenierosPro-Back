import { InjectRepository } from '@nestjs/typeorm';
import { FindSaleDto } from './dto/find-sale.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Sale } from './entities/sale.entity';
import { DeepPartial, Repository } from 'typeorm';
import { SaleDetail } from './entities/sale-detail.entity';
import { CreateSaleDto } from './dto';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale) private saleRepository: Repository<Sale>,
    @InjectRepository(SaleDetail)
    private saleDetailRepository: Repository<SaleDetail>,
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
        priceBase: true,
        pricePEN: true,
        priceUSD: true,
        status: true,
      },
      where: { studentId, status },
    });
  }

  async findOne(id: number, studentId: number): Promise<Partial<Sale>> {
    const sale = await this.saleRepository.findOne({
      relations: ['saleDetails'],
      select: {
        id: true,
        currency: true,
        date: true,
        paymentDate: true,
        priceBase: true,
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

  async create(createSaleDto: CreateSaleDto, studentId: number) {
    const date = new Date();
    const newSale = this.saleRepository.create({
      ...createSaleDto,
      date,
      paymentDate: date,
      products: '',
      transactionNumber: createSaleDto.tokenPayment,
    });
    const sale = await this.saleRepository.save(newSale);
    return sale;
  }

  async createSaleDetail(){
    
  }
}
