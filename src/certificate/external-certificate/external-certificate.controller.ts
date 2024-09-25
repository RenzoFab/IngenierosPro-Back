import { Controller } from '@nestjs/common';
import { ExternalCertificateService } from './external-certificate.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('External-certificate')
@Controller('external-certificate')
export class ExternalCertificateController {
  constructor(
    private readonly externalCertificateService: ExternalCertificateService,
  ) {}

  // @Post()
  // create(@Body() createExternalCertificateDto: CreateExternalCertificateDto) {
  //   return this.externalCertificateService.create(createExternalCertificateDto);
  // }

  // @Get()
  // findAll() {
  //   return this.externalCertificateService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.externalCertificateService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateExternalCertificateDto: UpdateExternalCertificateDto,
  // ) {
  //   return this.externalCertificateService.update(
  //     +id,
  //     updateExternalCertificateDto,
  //   );
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.externalCertificateService.remove(+id);
  // }
}
