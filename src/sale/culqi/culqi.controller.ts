import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CulqiService } from './culqi.service';
import { CreateCulqiDto } from './dto/create-culqi.dto';
import { UpdateCulqiDto } from './dto/update-culqi.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('culqi')
@Controller('culqi')
export class CulqiController {
  constructor(private readonly culqiService: CulqiService) {}

  @Post()
  create(@Body() createCulqiDto: CreateCulqiDto) {
    return this.culqiService.create(createCulqiDto);
  }

  @Get()
  findAll() {
    return this.culqiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.culqiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCulqiDto: UpdateCulqiDto) {
    return this.culqiService.update(+id, updateCulqiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.culqiService.remove(+id);
  }
}
