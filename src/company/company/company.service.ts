import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { FindCompanyDto } from './dto/find-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}

  // create(createCompanyDto: CreateCompanyDto) {
  //   return 'This action adds a new company';
  // }

  async findAll({ state }: FindCompanyDto) {
    const companies = await this.companyRepository.find({
      where: { state },
    });
    return companies;
  }

  async findOne(name: string) {
    try {
      const [company] = await this.companyRepository.findBy({ name });
      if (!company)
        throw new NotFoundException(
          `No se encontro el curso con nombre "${name}"`,
        );
      return company;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // update(id: number, updateCompanyDto: UpdateCompanyDto) {
  //   return `This action updates a #${id} company`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} company`;
  // }
}
