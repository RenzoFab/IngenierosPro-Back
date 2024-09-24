import { Controller, Get, Param, Query } from '@nestjs/common';
import { AgreementService } from './agreement.service';
import { ApiTags } from '@nestjs/swagger';
import { FindAgreementDto } from './dto';

@ApiTags('Agreement')
@Controller('agreement')
export class AgreementController {
  constructor(private readonly agreementService: AgreementService) {}

  // @Post()
  // create(@Body() createAgreementDto: CreateAgreementDto) {
  //   return this.agreementService.create(createAgreementDto);
  // }

  @Get()
  findAll(@Query() findAgreementDto: FindAgreementDto) {
    return this.agreementService.findAll(findAgreementDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.agreementService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAgreementDto: UpdateAgreementDto) {
  //   return this.agreementService.update(+id, updateAgreementDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.agreementService.remove(+id);
  // }
}
