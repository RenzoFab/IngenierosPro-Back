import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Material } from './entities/material.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
  ) {}

  // create(createMaterialDto: CreateMaterialDto) {
  //   return 'This action adds a new material';
  // }

  async findAll() {
    const materials = await this.materialRepository.find({
      take: 10,
    });
    return materials;
  }

  async findOne(id: number) {
    const [material] = await this.materialRepository.findBy({
      id,
    });
    return material;
  }

  // update(id: number, updateMaterialDto: UpdateMaterialDto) {
  //   return `This action updates a #${id} material`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} material`;
  // }
}
