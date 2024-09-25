import { Controller } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Certificate')
@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  // @Post()
  // create(@Body() createCertificateDto: CreateCertificateDto) {
  //   return this.certificateService.create(createCertificateDto);
  // }

  // @Get()
  // findAll() {
  //   return this.certificateService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.certificateService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCertificateDto: UpdateCertificateDto,
  // ) {
  //   return this.certificateService.update(+id, updateCertificateDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.certificateService.remove(+id);
  // }
}
