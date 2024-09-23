import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCourseDto, FindCourseDto, FindOneCourseDto } from './dto';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // @Post()
  // create(@Body() createCourseDto: CreateCourseDto) {
  //   return this.courseService.create(createCourseDto);
  // }

  @Get()
  findAll(@Query() findCourseDto: FindCourseDto) {
    return this.courseService.findAll(findCourseDto);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query() findOneCourseDto: FindOneCourseDto,
  ) {
    return this.courseService.findOne(+id, findOneCourseDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
  //   return this.courseService.update(+id, updateCourseDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.courseService.remove(+id);
  // }
}
