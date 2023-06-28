import { Module } from '@nestjs/common';
import { QryWorkspaceService } from 'src/service/workspace/qry.workspace.service';
import { CmdWorkspaceService } from 'src/service/workspace/cmd.workspace.service';
import { RepositoryModule } from 'src/repository/repository.module';

export * from 'src/service/workspace/qry.workspace.service';
export * from 'src/service/workspace/cmd.workspace.service';
export * from 'src/service/workspace/workspace.object';

@Module({
  imports: [RepositoryModule],
  providers: [QryWorkspaceService, CmdWorkspaceService],
  exports: [QryWorkspaceService, CmdWorkspaceService],
})
export class WorkspaceServiceModule {}
