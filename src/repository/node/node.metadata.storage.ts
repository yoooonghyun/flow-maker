import {
  NodeMetadatValue,
  NodeMetadata,
  NodeMetadataKey,
} from './node.metadata';

export class NodeMetadataStrorage {
  private static readonly metadataMaps: {
    [label: string]: NodeMetadata;
  } = {};

  public static getMetadata(label: string): NodeMetadata {
    return this.metadataMaps[label];
  }

  public static setMetadata(label: string, metadata: NodeMetadata): void {
    this.metadataMaps[label] = metadata;
  }

  public static getMetadataValue<T extends NodeMetadatValue>(
    label: string,
    key: NodeMetadataKey,
  ): T {
    return this.metadataMaps[label][key] as T;
  }

  public static setMetadataValue(
    label: string,
    key: NodeMetadataKey,
    value: NodeMetadatValue,
  ): void {
    console.log(this.metadataMaps);

    this.metadataMaps[label][key] = value;
  }
}
