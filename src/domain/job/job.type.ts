import { registerEnumType } from '@nestjs/graphql';

export enum JobType {
  SHELL = 'SHELL',
  WASM = 'WASM',
}

registerEnumType(JobType, { name: 'JobType' });
