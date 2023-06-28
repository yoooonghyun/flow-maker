import { Args, Resolver, Query } from '@nestjs/graphql';
import { QryResourceService } from 'src/service/resource/qry.resource.service';
import {
  QryResourceListObject,
  QryResourceObject,
} from 'src/service/resource/resource.object';

@Resolver(() => QryResourceObject)
export class QryResourceResolver {
  constructor(private readonly qryResourceSvc: QryResourceService) {}

  @Query(() => QryResourceListObject)
  public async resources(): Promise<QryResourceListObject> {
    return this.qryResourceSvc.readMany();
  }

  @Query(() => QryResourceObject)
  public async resource(
    @Args('resourceId') resourceId: string,
  ): Promise<QryResourceObject> {
    return this.qryResourceSvc.read(resourceId);
  }
}
