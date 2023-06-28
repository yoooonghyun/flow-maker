import { JobStatus, JobType } from 'src/domain/job/job.constant';
import { Field, ObjectType } from '@nestjs/graphql';
import { SchemaDecorator } from 'src/repository/decorator/schema.decorator';
import { DataUtils } from 'src/utils/data.utils';
import { TimeUtils } from 'src/utils/time.utils';
import { DateStringScalar } from 'src/common/scalar/date.string.scalar';

export * from 'src/domain/job/job.constant';

@SchemaDecorator.Node('job')
@ObjectType({ description: 'Job object.' })
export class Job {
  @SchemaDecorator.NodeId()
  @Field(() => String, { description: 'Unique id. Auto-generated value.' })
  public readonly jobId: string;

  @SchemaDecorator.Property()
  @Field(() => String, { description: 'Workspace id job included.' })
  public readonly workspaceId: string;

  @SchemaDecorator.Property()
  @Field(() => String, { description: 'Job name that defined by user.' })
  public readonly name: string;

  @SchemaDecorator.Property()
  @Field(() => JobType, { description: 'Empty infomation.' })
  public readonly jobType: JobType;

  @SchemaDecorator.Property()
  @Field(() => DateStringScalar, { description: 'Job created timestamp.' })
  public readonly createdAt: string;

  @SchemaDecorator.Property()
  @Field(() => DateStringScalar, { description: 'Job last updated timestamp.' })
  public readonly updatedAt: string;

  @SchemaDecorator.Property()
  @Field(() => DateStringScalar, {
    description: 'Job completed (success, failed, canceled) timestamp.',
  })
  public readonly completedAt: string;

  @SchemaDecorator.Property()
  @Field(() => JobStatus, { description: 'Running status of job.' })
  public readonly status: JobStatus;

  @SchemaDecorator.Property()
  @Field(() => String, { description: 'File path to execute.' })
  public readonly path: string;

  constructor() {
    const currentTimestamp: string = TimeUtils.now().toJSON();

    this.jobId = DataUtils.generateUuid();
    this.createdAt = currentTimestamp;
    this.updatedAt = currentTimestamp;
    this.status = JobStatus.CRETEAD;
  }
}
