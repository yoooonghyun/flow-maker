import { Module } from '@nestjs/common';
import { ResourceServiceModule } from 'src/service/resource/resource.service.module';
import { JobServiceModule } from 'src/service/job/job.service.module';
import { WorkspaceServiceModule } from 'src/service/workspace/workspace.service.module';

@Module({
  imports: [ResourceServiceModule, JobServiceModule, WorkspaceServiceModule],
  exports: [ResourceServiceModule, JobServiceModule, WorkspaceServiceModule],
})
export class ServiceModule {}
