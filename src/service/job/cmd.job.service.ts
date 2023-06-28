import { Injectable, Scope } from '@nestjs/common';
import { Job } from 'src/domain/job/job';
import { Repository } from 'src/repository/repository.module';
import { CreateJobObject, QryJobObject } from 'src/service/job/job.object';

@Injectable({ scope: Scope.REQUEST })
export class CmdJobService {
  constructor(private readonly repo: Repository) {}

  public async create(obj: CreateJobObject): Promise<QryJobObject> {
    const job = new Job();

    Object.assign(job, obj);

    return await this.repo.create(Job, job);
  }

  public async createPipeline(obj: CreateJobObject): Promise<QryJobObject> {
    const job = new Job();

    Object.assign(job, obj);

    return await this.repo.create(Job, job);
  }

  public async delete(jobId: string): Promise<QryJobObject> {
    return await this.repo.deleteById(Job, jobId);
  }
}
