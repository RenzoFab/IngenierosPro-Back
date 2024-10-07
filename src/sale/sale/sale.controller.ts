import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { SaleService } from './sale.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindSaleDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags('Sale')
@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get()
  findAll(
    @Query() findSaleDto: FindSaleDto,
    @GetUser('studentId') studentId: number,
  ) {
    return this.saleService.findAll({ studentId, ...findSaleDto });
  }

  @Get(':id')
  findOne(@Param('id') id: number, @GetUser('studentId') studentId: number) {
    return this.saleService.findOne(id, studentId);
  }
}
