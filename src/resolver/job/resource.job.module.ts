import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { QryJobResolver } from 'src/resolver/job/qry.job.resolver';
import { CmdJobResolver } from 'src/resolver/job/cmd.job.resolver';

@Module({
  imports: [ServiceModule],
  providers: [CmdJobResolver, QryJobResolver],
})
export class JobResolverModule {}
