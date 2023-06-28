import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { Workspace } from 'src/domain/workspace/workspace';

/**
 * Represents a workspace object for querying APIs such as HTTP (GET) or GraphQL (Query).
 * @class
 */
@ObjectType({ description: 'Represents a workspace object.' })
export class QryWorkspaceObject extends OmitType(Workspace, [] as const) {}

/**
 * Represents a list of workspaces.
 * @class
 */
@ObjectType({ description: 'Represents a list of workspaces.' })
export class QryWorkspaceListObject {
  @Field(() => [QryWorkspaceObject], { description: 'Array of workspaces' })
  public readonly list: QryWorkspaceObject[];
}

/**
 * Represents an input object for creating a workspace.
 * @class
 */
@InputType({
  description: 'Represents an input object for creating a workspace.',
})
export class CreateWorkspaceObject extends PickType(
  Workspace,
  ['name'] as const,
  InputType,
) {}

/**
 * Represents an input object for updating status of workspaces.
 * @class
 */
@InputType({
  description: 'Represents an input object for updating status of workspaces.',
})
export class UpdateWorkspaceStatusObject extends PickType(
  Workspace,
  ['status'] as const,
  InputType,
) {}
