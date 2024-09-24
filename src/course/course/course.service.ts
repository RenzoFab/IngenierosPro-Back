import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { FindOptionsWhere, LessThan, MoreThan, Repository } from 'typeorm';
import { FindCourseDto, FindOneCourseDto } from './dto';
import { ModuleStatus } from '../module/enum/module.enum';
import { SessionStatus } from '../session/enum/session.enum';

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
    const [courses, total] = await this.courseRepository.findAndCount({
      where: {
        state: state,
        modality: modality,
        type: type,
        ...(published && {
          publicationStartDate: LessThan(new Date()),
          publicationEndDate: MoreThan(new Date()),
        }),

        company: {
          name: company,
        },
        category: {
          name: category,
        },
      },
      take: limit,
      skip: offset,
    });
    return { total, courses };
  }

  async findOne(
    id: number,
    { company, published, state, modules, sessions }: FindOneCourseDto,
  ) {
    try {
      const currentDate = new Date();
      const relations: string[] = [];
      const whereOptions: FindOptionsWhere<Course> = {
        id: id,
        state: state,
        ...(published && {
          publicationStartDate: LessThan(currentDate),
          publicationEndDate: MoreThan(currentDate),
        }),
        company: {
          name: company,
        },
      };
      if (modules) {
        relations.push('modules');
        whereOptions.modules = { state: ModuleStatus.Active };
        if (sessions) {
          relations.push('modules.sessions');
          whereOptions.modules.sessions = { state: SessionStatus.Active };
        }
      }
      const [course] = await this.courseRepository.find({
        relations,
        where: whereOptions,
      });

      if (!course) throw new NotFoundException('No se encontro el curso');
      return course;
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
