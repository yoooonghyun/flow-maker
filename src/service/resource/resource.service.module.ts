import { Module } from '@nestjs/common';
import { QryResourceService } from 'src/service/resource/qry.resource.service';
import { CmdResourceService } from 'src/service/resource/cmd.resource.service';
import { RepositoryModule } from 'src/repository/repository.module';

export * from 'src/service/resource/qry.resource.service';
export * from 'src/service/resource/cmd.resource.service';
export * from 'src/service/resource/resource.object';

@Module({
  imports: [RepositoryModule],
  providers: [QryResourceService, CmdResourceService],
  exports: [QryResourceService, CmdResourceService],
})
export class ResourceServiceModule {}
