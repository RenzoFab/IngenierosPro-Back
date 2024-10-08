import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@ApiTags('Coupon')
@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get(':term')
  findOne(
    @Param('term') term: string,
    @GetUser('companyId') companyId: number,
  ) {
    return this.couponService.findOne(term, companyId);
  }
}
