export enum SchemaMetadataKey {
  LABEL = 'LABEL',
  PROPERTIES = 'PROPERTIES',
  NODE_ID = 'NODE_ID',
}

export type SchemaMetadatValue = string | string[] | null;

export type SchemaMetadata = {
  [key in SchemaMetadataKey]: SchemaMetadatValue;
};
