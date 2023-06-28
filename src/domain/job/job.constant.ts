import { registerEnumType } from '@nestjs/graphql';

export enum JobType {
  SHELL = 'SHELL',
  WASM = 'WASM',
}

registerEnumType(JobType, { name: 'JobType' });

export enum JobStatus {
  CRETEAD = 'CRETEAD',
  PREDING = 'PREDING',
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELED = 'CANCELED',
}

registerEnumType(JobStatus, { name: 'JobStatus' });
