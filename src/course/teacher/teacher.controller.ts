import { Controller, Get, Param, Query } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { ApiTags } from '@nestjs/swagger';
import { FindTeacherDto } from './dto';

@ApiTags('Teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  // @Post()
  // create(@Body() createTeacherDto: CreateTeacherDto) {
  //   return this.teachersService.create(createTeacherDto);
  // }

  @Get()
  findAll(@Query() findTeacherDto: FindTeacherDto) {
    return this.teacherService.findAll(findTeacherDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
  //   return this.teachersService.update(+id, updateTeacherDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.teachersService.remove(+id);
  // }
}
