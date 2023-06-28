import { Injectable, Scope } from '@nestjs/common';
import { Workspace } from 'src/domain/workspace/workspace';
import { Repository } from 'src/repository/repository';
import {
  QryWorkspaceListObject,
  QryWorkspaceObject,
} from 'src/service/workspace/workspace.object';

/**
 * Service class for querying workspace objects.
 * @class
 */
@Injectable({ scope: Scope.REQUEST })
export class QryWorkspaceService {
  /**
   * Creates an instance of QryWorkspaceService.
   * @constructor
   * @param {Repository} repo - The repository used for data access.
   */
  constructor(private readonly repo: Repository) {}

  /**
   * Finds a single workspace by its unique ID.
   * @public
   * @async
   * @method
   * @param {string} workspaceId - The unique ID of the workspace to find.
   * @returns {Promise<QryWorkspaceObject>} - A promise that resolves to the queried workspace object.
   */
  public async read(workspaceId: string): Promise<QryWorkspaceObject> {
    return await this.repo.read(Workspace, workspaceId);
  }

  /**
   * Finds multiple workspaces.
   * @public
   * @async
   * @method
   * @returns {Promise<QryWorkspaceListObject>} - A promise that resolves to the list of queried workspace objects.
   */
  public async readMany(): Promise<QryWorkspaceListObject> {
    return await this.repo.readMany(Workspace);
  }
}
