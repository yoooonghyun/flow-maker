import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateEdgeObject } from 'src/service/object/edge.object';
import { CmdWorkspaceService } from 'src/service/workspace/cmd.workspace.service';
import {
  CreateWorkspaceObject,
  QryWorkspaceObject,
  UpdateWorkspaceStatusObject,
} from 'src/service/workspace/workspace.object';

/**
 * Presetation layer for representing workspace.
 * @class
 */
@Resolver()
export class CmdWorkspaceResolver {
  constructor(private readonly cmdWorkspaceSvc: CmdWorkspaceService) {}

  @Mutation(() => QryWorkspaceObject)
  public async createWorkspace(
    @Args('createWorkspaceObject', { type: () => CreateWorkspaceObject })
    createWorkspaceObj: CreateWorkspaceObject,
  ): Promise<QryWorkspaceObject> {
    return await this.cmdWorkspaceSvc.create(createWorkspaceObj);
  }

  @Mutation(() => QryWorkspaceObject)
  public async updateWorkspaceStatus(
    @Args('workspaceId', { type: () => String }) workspaceId: string,
    @Args('updateWorkspaceObject', { type: () => UpdateWorkspaceStatusObject })
    updateWorkspaceObj: UpdateWorkspaceStatusObject,
  ): Promise<QryWorkspaceObject> {
    return await this.cmdWorkspaceSvc.updateStatus(
      workspaceId,
      updateWorkspaceObj,
    );
  }

  @Mutation(() => Boolean)
  public async createWorkspacePipeline(
    @Args('workspaceId', { type: () => String }) workspaceId: string,
    @Args('jobEdges', { type: () => [CreateEdgeObject] })
    jobEdges: CreateEdgeObject[],
  ): Promise<boolean> {
    await this.cmdWorkspaceSvc.createPipeline(workspaceId, jobEdges);
    return true;
  }

  @Mutation(() => QryWorkspaceObject)
  public async deleteWorkspace(
    @Args('workspaceId', { type: () => String }) workspaceId: string,
  ): Promise<QryWorkspaceObject> {
    return await this.cmdWorkspaceSvc.delete(workspaceId);
  }
}
