import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { SaleService } from './sale.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindSaleDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Sale')
@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findAll(@Query() findSaleDto: FindSaleDto, @Req() request: Express.Request) {
    return this.saleService.findAll(findSaleDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findOne(@Param('id') id: number) {
    return this.saleService.findOne(id);
  }
}
