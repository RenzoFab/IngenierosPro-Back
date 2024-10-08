import { Injectable } from '@nestjs/common';
import { CreateCulqiDto } from './dto/create-culqi.dto';
import { UpdateCulqiDto } from './dto/update-culqi.dto';

@Injectable()
export class CulqiService {
  create(createCulqiDto: CreateCulqiDto) {
    return 'This action adds a new culqi';
  }

  findAll() {
    return `This action returns all culqi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} culqi`;
  }

  update(id: number, updateCulqiDto: UpdateCulqiDto) {
    return `This action updates a #${id} culqi`;
  }

  remove(id: number) {
    return `This action removes a #${id} culqi`;
  }
}
