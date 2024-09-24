import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Agreement } from './entities/agreement.entity';
import { FindAgreementDto } from './dto';

@Injectable()
export class AgreementService {
  constructor(
    @InjectRepository(Agreement)
    private agreeementRepository: Repository<Agreement>,
  ) {}

  // create(createAgreementDto: CreateAgreementDto) {
  //   return 'This action adds a new agreement';
  // }

  async findAll({ company, state }: FindAgreementDto) {
    const agreements = await this.agreeementRepository.find({
      where: {
        state,
        company: {
          name: company,
        },
      },
    });
    return agreements;
  }

  // async findOne(id: number) {
  //   const [agreement] = await this.agreeementRepository.findBy({ id });
  //   return agreement;
  // }

  // update(id: number, updateAgreementDto: UpdateAgreementDto) {
  //   return `This action updates a #${id} agreement`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} agreement`;
  // }
}
