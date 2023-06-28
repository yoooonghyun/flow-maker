import { Field, ObjectType } from '@nestjs/graphql';
import { SchemaDecorator } from 'src/repository/decorator/schema.decorator';
import { WorkspaceStatus } from 'src/domain/workspace/workspace.constant';
import { DateStringScalar } from 'src/common/scalar/date.string.scalar';
import { TimeUtils } from 'src/utils/time.utils';
import { DataUtils } from 'src/utils/data.utils';

export * from 'src/domain/workspace/workspace.constant';

/**
 * Schema class representing workspace.
 * This class is used to describe a resource that will be used for tasks.
 * @class
 */
@SchemaDecorator.Node('workspace')
@ObjectType({ description: 'Workspace object.' })
export class Workspace {
  /**
   * Unique id used to identify the resource.
   * @property {number}
   */
  @SchemaDecorator.NodeId()
  @Field(() => String, { description: 'Unique id. Auto-generated value.' })
  public readonly workspaceId: string;

  @SchemaDecorator.Property()
  @Field(() => String, { description: 'Job name that defined by user.' })
  public readonly name: string;

  @SchemaDecorator.Property()
  @Field(() => DateStringScalar, {
    description: 'Workspace created timestamp.',
  })
  public readonly createdAt: string;

  @SchemaDecorator.Property()
  @Field(() => DateStringScalar, {
    description: 'Workspace last updated timestamp.',
  })
  public readonly updatedAt: string;

  @SchemaDecorator.Property()
  @Field(() => DateStringScalar, {
    description: 'Workspace completed (success, failed, canceled) timestamp.',
  })
  public readonly completedAt: string;

  @SchemaDecorator.Property()
  @Field(() => WorkspaceStatus, { description: 'Running status of workspace.' })
  public readonly status: WorkspaceStatus;

  @SchemaDecorator.Property()
  @Field(() => String, { description: 'Directory path .' })
  public readonly directory: string;
  jo;

  constructor() {
    const currentTimestamp: string = TimeUtils.now().toJSON();
    const uuid: string = DataUtils.generateUuid();

    this.createdAt = currentTimestamp;
    this.updatedAt = currentTimestamp;
    this.workspaceId = uuid;
    this.directory = uuid;
  }
}
