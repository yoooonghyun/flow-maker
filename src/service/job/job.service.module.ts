import { Module } from '@nestjs/common';
import { QryJobService } from 'src/service/job/qry.job.service';
import { CmdJobService } from 'src/service/job/cmd.job.service';
import { RepositoryModule } from 'src/repository/repository.module';

export * from 'src/service/job/qry.job.service';
export * from 'src/service/job/cmd.job.service';
export * from 'src/service/job/job.object';

@Module({
  imports: [RepositoryModule],
  providers: [QryJobService, CmdJobService],
  exports: [QryJobService, CmdJobService],
})
export class JobServiceModule {}
