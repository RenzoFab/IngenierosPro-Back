import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  In,
  LessThan,
  MoreThan,
  Repository,
} from 'typeorm';
import { FindCourseDto, FindOneCourseDto, FindOwnCourseDto } from './dto';
import { ModuleStatus } from './enum/module.enum';
import { SessionStatus } from './enum/session.enum';
import { CourseOrder, CourseState } from './enum/course.enum';
import { SaleDetail } from 'src/sale/entities/sale-detail.entity';
import { SaleDetailServiceType } from 'src/sale/enum/sale-detail.enum';
import { SaleStatus } from 'src/sale/enum/sale.enum';
import { Course } from './entities';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(SaleDetail)
    private saleDetailRepository: Repository<SaleDetail>,
  ) {}

  async findAll({
    category,
    company,
    limit,
    modality,
    offset,
    published,
    state,
    type,
    order,
    difficulty,
  }: FindCourseDto) {
    const orderBy = this.getOrder(order);
    const where: FindOptionsWhere<Course> = {
      state,
      modality,
      difficulty,
      type,
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
    };
    const [courses, total] = await this.courseRepository.findAndCount({
      where,
      take: limit,
      skip: offset,
      order: orderBy,
    });
    return { total, courses };
  }

  async findOne(id: number, { company, published, state }: FindOneCourseDto) {
    try {
      const currentDate = new Date();
      const relations = ['modules', 'modules.sessions'];
      const select = {
        modules: {
          id: true,
          name: true,
          order: true,
          sessions: {
            id: true,
            name: true,
            order: true,
          },
        },
      };
      const where = {
        id: id,
        state: state,
        ...(published && {
          publicationStartDate: LessThan(currentDate),
          publicationEndDate: MoreThan(currentDate),
        }),
        company: {
          name: company,
        },
        modules: {
          state: ModuleStatus.Active,
          sessions: {
            state: SessionStatus.Active,
          },
        },
      };

      const order: FindOptionsOrder<Course> = {
        modules: {
          order: 'ASC',
          sessions: {
            order: 'ASC',
          },
        },
      };
      const [course] = await this.courseRepository.find({
        relations,
        select,
        where,
        order,
      });
      if (!course)
        throw new NotFoundException(`No se encontro el curso con id "${id}"`);
      return course;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findOwnCourses({
    category,
    limit,
    modality,
    offset,
    type,
    order,
    difficulty,
    studentId,
  }: FindOwnCourseDto & { studentId: number }) {
    const orderBy = this.getOrder(order);
    const where: FindOptionsWhere<Course> = {
      modality,
      difficulty,
      type,
      category: {
        name: category,
      },
    };
    const own = await this.saleDetailRepository.find({
      select: {
        serviceId: true,
        serviceType: true,
        accessEndDate: true,
        accessStartDate: true,
        status: true,
      },
      where: {
        serviceType: SaleDetailServiceType.Course,
        sale: { studentId, status: SaleStatus.Paid },
      },
    });
    const [ownCourses, total] = await this.courseRepository.findAndCount({
      where: {
        id: In(own.map((res) => res.serviceId)),
        ...where,
      },
      order: orderBy,
      take: limit,
      skip: offset,
    });

    const coursesWithProgress = await Promise.all(
      ownCourses.map(async (course) => {
        let query = `SELECT fn_devolver_progreso_curso(${course.id}, ${studentId}) as progreso`;
        const [result] = await this.courseRepository.query(query);
        // query = `SELECT fn_verificar_acceso_curso_gratuito(${studentId}, ${course.id}, m.matricula_id) as acces`
        return {
          ...course,
          progreso: result.progreso,
        };
      }),
    );

    return { total, coursesWithProgress };
  }

  private getOrder(order: string): FindOptionsOrder<Course> {
    switch (order) {
      case CourseOrder.Newest:
        return { publicationStartDate: 'DESC' };
      case CourseOrder.Oldest:
        return { publicationStartDate: 'ASC' };
      case CourseOrder.Cheapest:
        return { pricePen: 'ASC' };
      case CourseOrder.Expensive:
        return { pricePen: 'DESC' };
      case CourseOrder.AtoZ:
        return { name: 'ASC' };
      case CourseOrder.ZtoA:
        return { name: 'DESC' };
      default:
        return {};
    }
  }
}
