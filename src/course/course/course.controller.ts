import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCourseDto, GetCourseDto } from './dto';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // @Post()
  // create(@Body() createCourseDto: CreateCourseDto) {
  //   return this.courseService.create(createCourseDto);
  // }

  @Get()
  findAll(@Query() getCourseDto: GetCourseDto) {
    return this.courseService.findAll(getCourseDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
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
