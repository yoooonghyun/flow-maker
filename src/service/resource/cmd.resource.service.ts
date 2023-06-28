import { Injectable, Scope } from '@nestjs/common';
import { Resource } from 'src/domain/resource/resource';
import { Repository } from 'src/repository/repository.module';
import {
  CreateResourceObject,
  QryResourceObject,
} from 'src/service/resource/resource.object';

@Injectable({ scope: Scope.REQUEST })
export class CmdResourceService {
  /**
   * Creates an instance of {@link CmdResourceService}.
   * @param {Repository} repo - The repository used for data access.
   */
  constructor(private readonly repo: Repository) {}

  /**
   * Create a new resource.
   * @param {CreateResourceObject} obj - Initial value of the resource to be created.
   * @returns {Promise<QryResourceObject>} - Information about the created resource.
   */
  public async create(obj: CreateResourceObject): Promise<QryResourceObject> {
    const resource = new Resource();

    Object.assign(resource, obj);

    return await this.repo.create(Resource, resource);
  }

  /**
   * Deletes a resource by resourceId.
   * @param {string} resourceId - Node id of the resource to be deleted.
   * @returns {Promise<QryResourceObject>} - Information about the deleted resource.
   */
  public async delete(resourceId: string): Promise<QryResourceObject> {
    return await this.repo.deleteById(Resource, resourceId);
  }
}
