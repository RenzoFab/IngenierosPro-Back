import { Controller } from '@nestjs/common';
import { OwnCertificateService } from './own-certificate.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Own-certificate')
@Controller('own-certificate')
export class OwnCertificateController {
  constructor(private readonly ownCertificateService: OwnCertificateService) {}

  // @Post()
  // create(@Body() createOwnCertificateDto: CreateOwnCertificateDto) {
  //   return this.ownCertificateService.create(createOwnCertificateDto);
  // }

  // @Get()
  // findAll() {
  //   return this.ownCertificateService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.ownCertificateService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateOwnCertificateDto: UpdateOwnCertificateDto,
  // ) {
  //   return this.ownCertificateService.update(+id, updateOwnCertificateDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ownCertificateService.remove(+id);
  // }
}
