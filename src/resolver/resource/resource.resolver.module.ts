import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { QryResourceResolver } from 'src/resolver/resource/qry.resource.resolver';
import { CmdResourceResolver } from 'src/resolver/resource/cmd.resource.resolver';

@Module({
  imports: [ServiceModule],
  providers: [CmdResourceResolver, QryResourceResolver],
})
export class ResourceResolverModule {}
