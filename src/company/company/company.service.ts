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

  async findOne(term: string | number) {
    try {
      let company: Company;
      if (typeof term === 'number' || !isNaN(+term)) {
        company = await this.companyRepository.findOne({
          where: { id: +term },
        });
      } else {
        company = await this.companyRepository.findOne({
          where: { name: term },
        });
      }

      if (!company)
        throw new NotFoundException(`La empresa "${name}" no existe`);
      return company;
    } catch (error) {
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
