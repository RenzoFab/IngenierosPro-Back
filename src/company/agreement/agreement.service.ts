import { Injectable } from '@nestjs/common';
import { CreateAgreementDto } from './dto/create-agreement.dto';
import { UpdateAgreementDto } from './dto/update-agreement.dto';

@Injectable()
export class AgreementService {
  create(createAgreementDto: CreateAgreementDto) {
    return 'This action adds a new agreement';
  }

  findAll() {
    return `This action returns all agreement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agreement`;
  }

  update(id: number, updateAgreementDto: UpdateAgreementDto) {
    return `This action updates a #${id} agreement`;
  }

  remove(id: number) {
    return `This action removes a #${id} agreement`;
  }
}
