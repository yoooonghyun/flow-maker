import { Args, Resolver, Query } from '@nestjs/graphql';
import { QryWorkspaceService } from 'src/service/workspace/qry.workspace.service';
import {
  QryWorkspaceListObject,
  QryWorkspaceObject,
} from 'src/service/workspace/workspace.object';

@Resolver(() => QryWorkspaceObject)
export class QryWorkspaceResolver {
  constructor(private readonly qryWorkspaceSvc: QryWorkspaceService) {}

  @Query(() => QryWorkspaceListObject)
  public async workspaces(): Promise<QryWorkspaceListObject> {
    return this.qryWorkspaceSvc.readMany();
  }

  @Query(() => QryWorkspaceObject)
  public async workspace(
    @Args('workspaceId') workspaceId: string,
  ): Promise<QryWorkspaceObject> {
    return this.qryWorkspaceSvc.read(workspaceId);
  }
}
