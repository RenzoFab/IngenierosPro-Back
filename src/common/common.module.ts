import { Module } from '@nestjs/common';
import { FetchAdapter } from './adapters/fetch-adapter.interface';

@Module({
  providers: [FetchAdapter],
  exports: [FetchAdapter],
})
export class CommonModule {}
