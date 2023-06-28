import { Module } from '@nestjs/common';
import { ResourceResolverModule } from 'src/resolver/resource/resource.resolver.module';
import { JobResolverModule } from 'src/resolver/job/resource.job.module';
import { WorkspaceResolverModule } from 'src/resolver/workspace/resource.worksapce.module';

/**
 * Module class containing resolver modules.
 * Resolvers serve as the presentation layer for exporting the GQL API to the client.
 * The majority of code in resolver classes is dedicated to describing the API,
 * while the business logic is implemented in the service layer.
 * @class
 */
@Module({
  imports: [ResourceResolverModule, JobResolverModule, WorkspaceResolverModule],
})
export class ResolverModule {}
