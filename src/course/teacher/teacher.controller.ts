import { Controller, Get, Param } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  // @Post()
  // create(@Body() createTeacherDto: CreateTeacherDto) {
  //   return this.teachersService.create(createTeacherDto);
  // }

  @Get()
  findAll() {
    return this.teacherService.findAll();
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
