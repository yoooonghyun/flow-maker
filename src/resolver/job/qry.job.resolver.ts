import { Args, Resolver, Query } from '@nestjs/graphql';
import { QryJobService } from 'src/service/job/qry.job.service';
import { QryJobListObject, QryJobObject } from 'src/service/job/job.object';
/**
 * Resolver class that exports query interfaces related to the {@link Job} domain..
 * Contains query functions and resolve fields for the GQL API.
 * @class
 * @see {@link Job}
 */
@Resolver(() => QryJobObject)
export class QryJobResolver {
  /**
   * Creates an instance of {@link QryJobResolver}.
   * @param {QryJobService} qryJobSvc - Instance of the {@link QryJobService} class for querying the {@link Job} domain.
   */
  constructor(private readonly qryJobSvc: QryJobService) {}

  @Query(() => QryJobListObject, { description: 'Queries Job array.' })
  public async jobs(): Promise<QryJobListObject> {
    return this.qryJobSvc.readMany();
  }

  @Query(() => QryJobObject, { description: 'Queries a Job by job id.' })
  public async job(
    @Args({
      name: 'jobId',
      type: () => String,
      description: 'Node id of job to query.',
      nullable: false,
    })
    jobId: string,
  ): Promise<QryJobObject> {
    return this.qryJobSvc.read(jobId);
  }
}
