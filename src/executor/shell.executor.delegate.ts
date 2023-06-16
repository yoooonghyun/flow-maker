import { ChildProcess, execFile } from 'child_process';
import { Job } from 'src/domain/job/job';
import { ExecutorDelegate } from 'src/executor/executor.delegate';

export class ShellExecutorDelegate extends ExecutorDelegate {
  private path: string = null;
  public load(job: Job): Promise<void> {
    this.path = job.path;
    return;
  }
  public handle(input: any): Promise<any> {
    const child: ChildProcess = execFile(this.path, [input]);
    child.stderr.on('err', (err) => {
      console.error(`Shell error: ${err}`);
    });

    child.stdout.on('data', (data) => {
      console.log(`Shell print: ${data}`);
    });

    child.on('close', (data) => {
      console.log(data);
    });
    return;
  }
}
