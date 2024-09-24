import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { In, Not, Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
  ) {}

  // create(createTeacherDto: CreateTeacherDto) {
  //   return 'This action adds a new teacher';
  // }

  async findAll() {
    const teachers = this.teacherRepository.find({
      relations: ['user'],
      where: {
        user: {
          status: 1,
          firstName: Not(In(['--', '', ' '])),
        },
      },
    });
    return teachers;
  }

  async findOne(id: number) {
    try {
      const [teacher] = await this.teacherRepository.find({
        relations: ['user'],
        where: {
          id,
          user: {
            status: 1,
            firstName: Not(In(['--', '', ' '])),
          },
        },
      });
      if (!teacher)
        throw new NotFoundException(`No se encontro docente con id "${id}"`);
      return teacher;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // update(id: number, updateTeacherDto: UpdateTeacherDto) {
  //   return `This action updates a #${id} teacher`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} teacher`;
  // }
}
