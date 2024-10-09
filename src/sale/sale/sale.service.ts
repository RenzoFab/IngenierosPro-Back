import { CreateSaleDetailDto } from './dto/create-sale-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindSaleDto } from './dto/find-sale.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Sale } from './entities/sale.entity';
import { DeepPartial, Repository } from 'typeorm';
import { SaleDetail } from './entities/sale-detail.entity';
import { CreateSaleDto } from './dto';
import { Course } from 'src/course/course/entities';
import { Enrollment } from 'src/course/course/entities/enrollment.entity';
import { EnrollmentState } from 'src/course/course/enum/enrollment.enum';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale) private saleRepository: Repository<Sale>,
    @InjectRepository(SaleDetail)
    private saleDetailRepository: Repository<SaleDetail>,
    @InjectRepository(SaleDetail)
    private courseRepository: Repository<Course>,
    @InjectRepository(SaleDetail)
    private enrollmentRepository: Repository<Enrollment>,
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

  async createSaleDetail(createSaleDetailDto: CreateSaleDetailDto) {
    const newSaleDetail = this.saleDetailRepository.create({
      ...createSaleDetailDto,
      accessEndDate: '',
      accessStartDate: '',
      userCountry: '',
      couponPercentage: 0,
    });
    const saleDetail = await this.saleDetailRepository.save(newSaleDetail);
    return saleDetail;
  }

  async enrollCourse(
    courseId: number,
    studentId: number,
    saleDetailId: number,
    // packageId?: number,
  ) {
    const course = await this.courseRepository.findOne({
      select: {
        accessTime: true,
        startDate: true,
        teacherId: true,
      },
      where: { id: courseId },
    });

    const date = new Date();
    const accessEndDate = this.addDaysToDate(
      course.accessTime,
      course.startDate,
    );
    let data: DeepPartial<Enrollment> = {
      accessEndDate,
      accessStartDate: course.startDate,
      enrollmentDate: date,
      // packageId: 0,
      // packageType: EnrollmentPackageType.Promotion,
      progress: 0,
      status: EnrollmentState.Active,
      saleDetailId,
      studentId: studentId,
      teacherId: course.teacherId,
      courseId,
    };
    const enroll = await this.enrollmentRepository.findOne({
      select: {
        id: true,
      },
      where: {
        courseId,
        studentId,
      },
    });
    if (enroll) data.id = enroll.id;
    const newEnroll = this.enrollmentRepository.create(data);
    return await this.enrollmentRepository.save(newEnroll);
  }

  private addDaysToDate(days: number, date?: Date): Date {
    const localDate = date ? new Date(date) : new Date();
    localDate.setDate(localDate.getDate() + days);
    return localDate;
  }
}
