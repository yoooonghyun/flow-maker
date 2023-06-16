export enum NodeMetadataKey {
  LABEL = 'LABEL',
  PROPERTIES = 'PROPERTIES',
  NODE_ID = 'NODE_ID',
}

export type NodeMetadatValue = string | string[] | null;

export type NodeMetadata = {
  [key in NodeMetadataKey]: NodeMetadatValue;
};
