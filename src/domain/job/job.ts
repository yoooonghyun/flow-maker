import { JobType } from 'src/domain/job/job.type';
import { Model } from 'src/domain/decorator/model';
import { Field, Int } from '@nestjs/graphql';
import { SchemaDecorator } from 'src/repository/decorator/repository.decorator';

export * from 'src/domain/job/job.type';

@SchemaDecorator.Node('job')
@Model({ description: 'Job object.' })
export class Job {
  @SchemaDecorator.NodeId()
  @Field(() => Int, { description: 'Unique id. Auto-generated value.' })
  public readonly workId: number;

  @SchemaDecorator.Property()
  @Field(() => Date, { description: 'Job created time.' })
  public readonly createdAt: Date;

  @SchemaDecorator.Property()
  @Field(() => String, { description: 'Job name that defined by user.' })
  public readonly name: string;

  @SchemaDecorator.Property()
  @Field(() => JobType, { description: 'Unique id. Auto-generated value.' })
  public readonly jobType: JobType;

  @SchemaDecorator.Property()
  @Field(() => String, { description: 'File path to execute.' })
  public readonly path: string;
}
