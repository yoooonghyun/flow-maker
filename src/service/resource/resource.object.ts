import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { Resource } from 'src/domain/resource/resource';

/**
 * Represents a resource object for querying APIs such as HTTP (GET) or GraphQL (Query).
 * @class
 */
@ObjectType({ description: 'Represents a resource object.' })
export class QryResourceObject extends OmitType(Resource, [] as const) {}

/**
 * Represents a list of resources.
 * @class
 */
@ObjectType({ description: 'Represents a list of resources.' })
export class QryResourceListObject {
  @Field(() => [QryResourceObject], { description: 'Array of resources' })
  public readonly list: QryResourceObject[];
}

/**
 * Represents an input object for creating a resource.
 * @class
 */
@InputType({
  description: 'Represents an input object for creating a resource.',
})
export class CreateResourceObject extends PickType(
  Resource,
  ['domain', 'path', 'storageType'] as const,
  InputType,
) {}
