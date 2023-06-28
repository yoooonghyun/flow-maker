import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CmdResourceService } from 'src/service/resource/cmd.resource.service';
import {
  CreateResourceObject,
  QryResourceObject,
} from 'src/service/resource/resource.object';

/**
 * Resolver class that exports command interfaces related to the {@link Resource} domain.
 * Contains mutation functions for the GQL API.
 * @class
 * @see {@link Resource}
 */
@Resolver()
export class CmdResourceResolver {
  /**
   * Creates an instance of CmdResourceResolver.
   * @param {CmdResourceService} cmdResourceSvc - Instance of the {@link CmdResourceService} class for manipulating the {@link Resource} domain.
   */
  constructor(private readonly cmdResourceSvc: CmdResourceService) {}

  @Mutation(() => QryResourceObject, {
    description:
      'Create a new resource. If the request is successful, return information about the created resource.',
  })
  public async createResource(
    @Args({
      name: 'createResourceObject',
      nullable: false,
      description: 'Initial value of the resource to be created.',
      type: () => CreateResourceObject,
    })
    createResourceObj: CreateResourceObject,
  ): Promise<QryResourceObject> {
    return await this.cmdResourceSvc.create(createResourceObj);
  }

  @Mutation(() => QryResourceObject, {
    description:
      'Deletes a resource by resourceId. If the request is successful, return information about the created resource.',
  })
  public async deleteResource(
    @Args({
      name: 'resourceId',
      nullable: false,
      description: 'Node id of the resource to be deleted.',
      type: () => String,
    })
    resourceId: string,
  ): Promise<QryResourceObject> {
    return await this.cmdResourceSvc.delete(resourceId);
  }
}
