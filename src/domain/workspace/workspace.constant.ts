import { registerEnumType } from '@nestjs/graphql';

/**
 * Enumerator representing status of workspace.
 * @enum
 */
export enum WorkspaceStatus {
  CREATED = 'CREATED',
  PREDING = 'PREDING',
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELED = 'CANCELED',
}

registerEnumType(WorkspaceStatus, { name: 'WorkspaceStatus' });
