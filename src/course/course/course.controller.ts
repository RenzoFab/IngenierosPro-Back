import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindCourseDto, FindOneCourseDto, FindOwnCourseDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  findAll(@Query() findCourseDto: FindCourseDto) {
    return this.courseService.findAll(findCourseDto);
  }

  @Get('own')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  findOwnCourses(
    @Query() findOwnCourseDto: FindOwnCourseDto,
    @GetUser('studentId') studentId: number,
  ) {
    return this.courseService.findOwnCourses({
      ...findOwnCourseDto,
      studentId,
    });
  }

  @Get(':id')
  findOne(
    @Param('id') id: number,
    @Query() findOneCourseDto: FindOneCourseDto,
  ) {
    return this.courseService.findOne(+id, findOneCourseDto);
  }
}
