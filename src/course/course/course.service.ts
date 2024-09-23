import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Course,
  CourseModality,
  CourseState,
  CourseType,
} from './entities/course.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { GetCourseDto } from './dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  // create(createCourseDto: CreateCourseDto) {
  //   return 'This action adds a new course';
  // }

  async findAll({
    category,
    company,
    limit,
    modality,
    offset,
    published,
    state,
    type,
  }: GetCourseDto) {
    const [cursos, total] = await this.courseRepository.findAndCount({
      where: {
        curso_estado: state,
        curso_modalidad: modality,
        curso_tipo: type,
        ...(published && {
          curso_fecha_inicio_publicacion: LessThan(new Date()),
          curso_fecha_fin_publicacion: MoreThan(new Date()),
        }),

        institucion: {
          institucion_nombre: company,
        },
        categoria: {
          categoria_curso_nombre: category,
        },
      },
      take: limit,
      skip: offset,
    });
    return { total, cursos };
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  // update(id: number, updateCourseDto: UpdateCourseDto) {
  //   return `This action updates a #${id} course`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} course`;
  // }
}
