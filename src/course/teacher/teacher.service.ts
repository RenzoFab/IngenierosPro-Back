import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import {
  FindOptionsSelect,
  FindOptionsWhere,
  In,
  Not,
  Repository,
} from 'typeorm';
import { CourseState } from '../course/enum/course.enum';
import { FindTeacherDto } from './dto/find-teacher.dto';
import { Achievement } from './entities/achievement.entity';
import { FindAchievementDto } from './dto/find-achievement.dto';
import { AchievementType } from './enum/achievement.enum';
import { FindOneTeacherDto } from './dto/find-one-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
    @InjectRepository(Achievement)
    private achievementRepository: Repository<Achievement>,
  ) {}

  // create(createTeacherDto: CreateTeacherDto) {
  //   return 'This action adds a new teacher';
  // }

  async findAll({ limit, offset }: FindTeacherDto) {
    const teachers = await this.teacherRepository
      .createQueryBuilder('teacher')
      .leftJoin('teacher.user', 'user')
      .leftJoin('teacher.courses', 'courses')
      .select([
        'teacher.id as id',
        'user.firstName as firstName',
        'user.lastName as lastName',
        'user.image as image',
        'user.occupation as occupation',
        'COUNT(courses.id) AS courseCount',
      ])
      .where('user.status = :status', { status: 1 })
      .andWhere('user.firstName NOT IN (:...excludedNames)', {
        excludedNames: ['--', '', ' '],
      })
      .andWhere('courses.state = :courseState', {
        courseState: CourseState.Activo,
      })
      .groupBy('teacher.id, user.firstName, user.lastName')
      .orderBy('courseCount', 'DESC')
      .limit(limit)
      .offset(offset)
      .getRawMany();

    return teachers;
  }

  async findOne(id: number, { courses }: FindOneTeacherDto) {
    try {
      const relations: string[] = ['user'];
      const select: FindOptionsSelect<Teacher> = {
        user: {
          firstName: true,
          lastName: true,
          academicDegree: true,
          image: true,
          occupation: true,
        },
      };
      const where: FindOptionsWhere<Teacher> = {
        id,
        user: {
          status: 1,
          firstName: Not(In(['--', '', ' '])),
        },
      };
      if (courses) {
        relations.push('courses');
        where.courses = {
          state: CourseState.Activo,
        };
      }
      const [teacher] = await this.teacherRepository.find({
        relations,
        select,
        where,
      });
      if (!teacher)
        throw new NotFoundException(`No se encontro docente con id "${id}"`);
      const achievements = await this.findAchievement({
        userId: teacher.id,
        type: AchievementType.Docente,
      });
      return { ...teacher, achievements };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAchievement({ userId, type }: FindAchievementDto) {
    const achivements = await this.achievementRepository.find({
      where: { userTypeId: userId, type },
    });
    return achivements;
  }

  // update(id: number, updateTeacherDto: UpdateTeacherDto) {
  //   return `This action updates a #${id} teacher`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} teacher`;
  // }
}
