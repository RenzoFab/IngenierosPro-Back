import { Controller, Get, Query } from '@nestjs/common';
import { BannerService } from './banner.service';
import { FindBannerDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Banner')
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  // @Post()
  // create(@Body() createBannerDto: CreateBannerDto) {
  //   return this.bannerService.create(createBannerDto);
  // }

  @Get()
  findAll(@Query() findBannerDto: FindBannerDto) {
    return this.bannerService.findAll(findBannerDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bannerService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
  //   return this.bannerService.update(+id, updateBannerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bannerService.remove(+id);
  // }
}
