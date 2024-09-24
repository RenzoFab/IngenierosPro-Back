import { Injectable } from '@nestjs/common';
import { FindBannerDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from './entities/banner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner) private bannerRepository: Repository<Banner>,
  ) {}
  // create(createBannerDto: CreateBannerDto) {
  //   return 'This action adds a new banner';
  // }

  async findAll({ company }: FindBannerDto) {
    const banners = await this.bannerRepository.find({
      where: {
        company: {
          name: company,
        },
      },
    });
    return banners;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} banner`;
  // }

  // update(id: number, updateBannerDto: UpdateBannerDto) {
  //   return `This action updates a #${id} banner`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} banner`;
  // }
}
