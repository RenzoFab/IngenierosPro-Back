import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Module } from './entities/module.entity';
import { Repository } from 'typeorm';
import { FindModuleDto, FindOneModuleDto } from './dto';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Module) private moduleRepository: Repository<Module>,
  ) {}

  // create(createModuleDto: CreateModuleDto) {
  //   return 'This action adds a new module';
  // }

  async findAll({ courseId, state }: FindModuleDto) {
    const modules = await this.moduleRepository.find({
      where: {
        courseId,
        state,
      },
      take: courseId ? undefined : 10,
    });
    return modules;
  }

  async findOne(id: number, { state }: FindOneModuleDto) {
    try {
      const [module] = await this.moduleRepository.findBy({ id });
      if (!module)
        throw new NotFoundException(`No se encontro el modulo con id ${id}`);
      return module;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // update(id: number, updateModuleDto: UpdateModuleDto) {
  //   return `This action updates a #${id} module`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} module`;
  // }
}
