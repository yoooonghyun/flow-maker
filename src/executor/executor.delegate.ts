import { Job } from 'src/domain/job/job';

export abstract class ExecutorDelegate {
  public abstract load(job: Job): Promise<void>;
  public abstract handle(input: any): Promise<any>;
}
