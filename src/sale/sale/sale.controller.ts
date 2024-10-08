import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateSaleDto, FindSaleDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@ApiTags('Sale')
@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get()
  findAll(
    @Query() findSaleDto: FindSaleDto,
    @GetUser('studentId') studentId: number,
  ) {
    return this.saleService.findAll({ studentId, ...findSaleDto });
  }
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: number, @GetUser('studentId') studentId: number) {
    return this.saleService.findOne(id, studentId);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post()
  create(
    @Body() createSaleDto: CreateSaleDto,
    @GetUser('studentId') studentId: number,
  ) {
    return this.saleService.create(createSaleDto,studentId);
  }
}
