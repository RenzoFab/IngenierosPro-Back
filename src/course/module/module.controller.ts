import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ModuleService } from './module.service';
import { ApiTags } from '@nestjs/swagger';
import { FindModuleDto, FindOneModuleDto } from './dto';

@ApiTags('Module')
@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  // @Post()
  // create(@Body() createModuleDto: CreateModuleDto) {
  //   return this.moduleService.create(createModuleDto);
  // }

  // * Implementado
  // @Get()
  // findAll(@Query() findModuleDto: FindModuleDto) {
  //   return this.moduleService.findAll(findModuleDto);
  // }

  // * Implementado
  // @Get(':id')
  // findOne(
  //   @Param('id') id: number,
  //   @Query() findOneModuleDto: FindOneModuleDto,
  // ) {
  //   return this.moduleService.findOne(+id, findOneModuleDto);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
  //   return this.moduleService.update(+id, updateModuleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.moduleService.remove(+id);
  // }
}
