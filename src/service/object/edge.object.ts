import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@ObjectType({ description: 'Edge object to make graph.' })
export class Edge {
  @Field(() => String, { description: 'Start of edge.' })
  public readonly from: string;
  @Field(() => String, { description: 'End of edge.' })
  public readonly to: string;
}

@InputType()
export class CreateEdgeObject extends PickType(
  Edge,
  ['from', 'to'] as const,
  InputType,
) {}
