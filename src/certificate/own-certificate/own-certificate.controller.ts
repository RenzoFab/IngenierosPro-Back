import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OwnCertificateService } from './own-certificate.service';
import { CreateOwnCertificateDto } from './dto/create-own-certificate.dto';
import { UpdateOwnCertificateDto } from './dto/update-own-certificate.dto';

@Controller('own-certificate')
export class OwnCertificateController {
  constructor(private readonly ownCertificateService: OwnCertificateService) {}

  @Post()
  create(@Body() createOwnCertificateDto: CreateOwnCertificateDto) {
    return this.ownCertificateService.create(createOwnCertificateDto);
  }

  @Get()
  findAll() {
    return this.ownCertificateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownCertificateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOwnCertificateDto: UpdateOwnCertificateDto) {
    return this.ownCertificateService.update(+id, updateOwnCertificateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownCertificateService.remove(+id);
  }
}
