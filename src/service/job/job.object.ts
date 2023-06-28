import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { Job } from 'src/domain/job/job';

/**
 * Represents a job object for querying APIs such as HTTP (GET) or GraphQL (Query).
 * @class
 */
@ObjectType({ description: 'Represents a job object.' })
export class QryJobObject extends OmitType(Job, [] as const) {}

/**
 * Represents a list of jobs.
 * @class
 */
@ObjectType({ description: 'Represents a list of jobs.' })
export class QryJobListObject {
  @Field(() => [QryJobObject], { description: 'Array of jobs' })
  public readonly list: QryJobObject[];
}

/**
 * Represents an input object for creating a job.
 * @class
 */
@InputType({ description: 'Represents an input object for creating a job.' })
export class CreateJobObject extends PickType(
  Job,
  ['name', 'jobType', 'path'] as const,
  InputType,
) {}
