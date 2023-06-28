import { Injectable, Scope } from '@nestjs/common';
import { Resource } from 'src/domain/resource/resource';
import { Repository } from 'src/repository/repository';
import {
  QryResourceListObject,
  QryResourceObject,
} from 'src/service/resource/resource.object';

/**
 * Service class for querying resource objects.
 * @class
 */
@Injectable({ scope: Scope.REQUEST })
export class QryResourceService {
  /**
   * Creates an instance of QryResourceService.
   * @constructor
   * @param {Repository} repo - The repository used for data access.
   */
  constructor(private readonly repo: Repository) {}

  /**
   * Finds a single resource by its unique ID.
   * @public
   * @async
   * @method
   * @param {string} resourceId - The unique ID of the resource to find.
   * @returns {Promise<QryResourceObject>} - A promise that resolves to the queried resource object.
   */
  public async read(resourceId: string): Promise<QryResourceObject> {
    return await this.repo.read(Resource, resourceId);
  }

  /**
   * Finds multiple resources.
   * @public
   * @async
   * @method
   * @returns {Promise<QryResourceListObject>} - A promise that resolves to the list of queried resource objects.
   */
  public async readMany(): Promise<QryResourceListObject> {
    return await this.repo.readMany(Resource);
  }
}
