import { Module } from '@nestjs/common';
import { Repository } from './repository';

export * from './repository';

@Module({
  providers: [Repository],
  exports: [Repository],
})
export class RepositoryModule {}
