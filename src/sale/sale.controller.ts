import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { SaleService } from './sale.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindSaleDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/auth/entities';

@ApiTags('Sale')
@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findAll(
    @Query() findSaleDto: FindSaleDto,
    @GetUser('studentId') studentId: number,
  ) {
    return this.saleService.findAll({ studentId, ...findSaleDto });
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findOne(@Param('id') id: number, @GetUser('studentId') studentId: number) {
    return this.saleService.findOne(id, studentId);
  }

  @Get('courses')
  findOwnCourses() {
    return this.saleService.findOwnCourses(2);
  }
}
