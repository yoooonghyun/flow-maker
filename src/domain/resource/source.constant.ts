import { registerEnumType } from '@nestjs/graphql';

export enum StorageType {
  S3 = 'S3',
  LOCAL = 'LOCAL',
}

registerEnumType(StorageType, { name: 'StorageType' });
