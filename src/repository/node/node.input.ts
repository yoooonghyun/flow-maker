import { Type } from '@nestjs/common';

export class NodeInput<T> {
  constructor(schema: Type<T>, nodeId: string) {
    this.schema = schema;
    this.nodeId = nodeId;
  }

  readonly schema: Type<T>;
  readonly nodeId: string;

  public static create<T>(schema: Type<T>, nodeId: string) {
    return new NodeInput(schema, nodeId);
  }
}
