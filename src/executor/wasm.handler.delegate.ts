import { Job } from 'src/domain/job/job';
import { ExecutorDelegate } from 'src/executor/executor.delegate';

export class WasmExecutorDelegate extends ExecutorDelegate {
  public load(job: Job): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public handle(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
