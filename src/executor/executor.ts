import { Job, JobType } from 'src/domain/job/job';
import { ExecutorDelegate } from 'src/executor/executor.delegate';
import { ShellExecutorDelegate } from 'src/executor/shell.executor.delegate';
import { WasmExecutorDelegate } from 'src/executor/wasm.handler.delegate';
import { Type } from '@nestjs/common';

const delegateMap: { [key in JobType]: Type<ExecutorDelegate> } = {
  [JobType.SHELL]: ShellExecutorDelegate,
  [JobType.WASM]: WasmExecutorDelegate,
};

export class Executor {
  private readonly delegate: ExecutorDelegate;
  constructor(job: Job) {
    this.delegate = new delegateMap[job.jobType]();
  }

  public static async load(job: Job): Promise<Executor> {
    const handler = new Executor(job);
    await handler.delegate.load(job);
    return handler;
  }

  public async handle(input: any): Promise<any> {
    return this.delegate.handle(input);
  }
}
