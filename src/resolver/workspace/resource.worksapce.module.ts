import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { QryWorkspaceResolver } from 'src/resolver/workspace/qry.workspace.resolver';
import { CmdWorkspaceResolver } from 'src/resolver/workspace/cmd.workspace.resolver';

@Module({
  imports: [ServiceModule],
  providers: [CmdWorkspaceResolver, QryWorkspaceResolver],
})
export class WorkspaceResolverModule {}
