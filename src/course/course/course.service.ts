import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { FindCourseDto, FindOneCourseDto } from './dto';

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
  }: FindCourseDto) {
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

  async findOne(id: number, { company, published, state }: FindOneCourseDto) {
    try {
      const [curso] = await this.courseRepository.findBy({
        curso_id: id,
        curso_estado: state,
        ...(published && {
          curso_fecha_inicio_publicacion: LessThan(new Date()),
          curso_fecha_fin_publicacion: MoreThan(new Date()),
        }),
        institucion: {
          institucion_nombre: company,
        },
      });
      if (!curso) throw new NotFoundException('No se encontro el curso');
      return curso;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // update(id: number, updateCourseDto: UpdateCourseDto) {
  //   return `This action updates a #${id} course`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} course`;
  // }
}
