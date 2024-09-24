import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './entities/banner.entity';

@Module({
  controllers: [BannerController],
  providers: [BannerService],
  imports: [TypeOrmModule.forFeature([Banner])],
})
export class BannerModule {}
