import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CmdJobService } from 'src/service/job/cmd.job.service';
import { CreateJobObject, QryJobObject } from 'src/service/job/job.object';

@Resolver()
export class CmdJobResolver {
  constructor(private readonly cmdJobSvc: CmdJobService) {}

  @Mutation(() => QryJobObject)
  public async createJob(
    @Args('createJobObject') createJobObj: CreateJobObject,
  ): Promise<QryJobObject> {
    return await this.cmdJobSvc.create(createJobObj);
  }

  @Mutation(() => QryJobObject)
  public async deleteJob(@Args('jobId') jobId: string): Promise<QryJobObject> {
    return await this.cmdJobSvc.delete(jobId);
  }
}
