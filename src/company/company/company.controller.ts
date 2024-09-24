import { Controller, Get, Body, Patch, Param, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindCompanyDto } from './dto';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  // @Post()
  // create(@Body() createCompanyDto: CreateCompanyDto) {
  //   return this.companyService.create(createCompanyDto);
  // }

  @Get()
  findAll(@Query() findCompanyDto: FindCompanyDto) {
    return this.companyService.findAll(findCompanyDto);
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.companyService.findOne(name);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
  //   return this.companyService.update(+id, updateCompanyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.companyService.remove(+id);
  // }
}
