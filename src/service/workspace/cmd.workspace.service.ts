import { Injectable, Scope } from '@nestjs/common';
import { Workspace, WorkspaceStatus } from 'src/domain/workspace/workspace';
import { Repository } from 'src/repository/repository.module';
import {
  CreateWorkspaceObject,
  QryWorkspaceObject,
  UpdateWorkspaceStatusObject,
} from 'src/service/workspace/workspace.object';
import { CreateEdgeObject } from '../object/common.object';
import { NodeInput } from 'src/repository/node/node.input';
import { Job } from 'src/domain/job/job';
import { WhereOperator, WhereOptions } from 'src/repository/where/where.type';

/**
 * Service class for manipulating the Workspace domain.
 */
@Injectable({ scope: Scope.REQUEST })
export class CmdWorkspaceService {
  private readonly kChangigleStatusMap: {
    [key in WorkspaceStatus]: WorkspaceStatus[];
  } = {
    [WorkspaceStatus.CREATED]: [],
    [WorkspaceStatus.PREDING]: [
      WorkspaceStatus.CREATED,
      WorkspaceStatus.CANCELED,
      WorkspaceStatus.FAILED,
      WorkspaceStatus.SUCCESS,
    ],
    [WorkspaceStatus.RUNNING]: [WorkspaceStatus.PREDING],
    [WorkspaceStatus.CANCELED]: [
      WorkspaceStatus.CREATED,
      WorkspaceStatus.PREDING,
      WorkspaceStatus.RUNNING,
      WorkspaceStatus.FAILED,
    ],
    [WorkspaceStatus.FAILED]: [WorkspaceStatus.RUNNING],
    [WorkspaceStatus.SUCCESS]: [WorkspaceStatus.RUNNING],
  };

  /**
   * Creates an instance of {@link CmdWorkspaceService}.
   * @param {Repository} repo - The repository used for data access.
   */
  constructor(private readonly repo: Repository) {}

  /**
   * Creates a Workspace.
   * @param obj
   * @returns
   */
  public async create(obj: CreateWorkspaceObject): Promise<QryWorkspaceObject> {
    const workspace = new Workspace();

    Object.assign(workspace, obj);

    return await this.repo.create(Workspace, workspace);
  }

  public async createPipeline(
    workspaceId: string,
    jobEdges: CreateEdgeObject[],
  ): Promise<void> {
    const firstJobIds: string[] = this.findFirstJobIds(jobEdges);

    await this.createWorkspaceJobRelations(workspaceId, firstJobIds);

    await this.createJobPipeline(workspaceId, jobEdges);
  }

  public async updateStatus(
    workspaceId: string,
    obj: UpdateWorkspaceStatusObject,
  ): Promise<QryWorkspaceObject> {
    const whereOptions: WhereOptions<Workspace> = {
      workspaceId: workspaceId,
      status: { [WhereOperator.IN]: this.kChangigleStatusMap[obj.status] },
      directory: { [WhereOperator.BT]: ['A', 'B'] },
    };

    const updateRet = await this.repo.partialUpdate(
      Workspace,
      [whereOptions],
      obj,
    );

    if (updateRet.length < 1) throw new Error('Failed to update.');

    return updateRet[0];
  }

  public async delete(workspaceId: string): Promise<QryWorkspaceObject> {
    return await this.repo.deleteById(Workspace, workspaceId);
  }

  private findFirstJobIds(jobEdges: CreateEdgeObject[]): string[] {
    const edgeMap: { [key in string]: CreateEdgeObject } = {};

    jobEdges.forEach((e) => {
      edgeMap[e.from] = e;
    });

    jobEdges.forEach((e) => {
      delete edgeMap[e.from];
    });

    return Object.values(edgeMap).map((e) => e.from);
  }

  private async createWorkspaceJobRelations(
    workspaceId: string,
    jobIds: string[],
  ) {
    const workspaceNode: NodeInput<Workspace> = NodeInput.create(
      Workspace,
      workspaceId,
    );

    await Promise.all(
      jobIds.map(async (i) => {
        const jobNode: NodeInput<Job> = NodeInput.create(Job, i);

        await this.repo.createRelation(workspaceNode, jobNode, workspaceId);
      }),
    );
  }

  private async createJobPipeline(
    workspaceId: string,
    jobEdges: CreateEdgeObject[],
  ) {
    await Promise.all(
      jobEdges.map(async (e) => {
        const fromNode: NodeInput<Job> = NodeInput.create(Job, e.from);

        const toNode: NodeInput<Job> = NodeInput.create(Job, e.to);

        await this.repo.createRelation(fromNode, toNode, workspaceId);
      }),
    );
  }
}
