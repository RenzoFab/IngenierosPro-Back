import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Module as module } from './entities/module.entity';

@Module({
  controllers: [ModuleController],
  providers: [ModuleService],
  imports: [TypeOrmModule.forFeature([module])],
})
export class ModuleModule {}
