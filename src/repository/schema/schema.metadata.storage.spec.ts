import { SchemaMetadataStrorage } from './schema.metadata.storage';
import { SchemaMetadata, SchemaMetadataKey } from './schema.metadata';

describe('SchemaMetadataStrorage', () => {
  class A {
    public readonly aId: number;
    public readonly stringValue: string;
  }
  afterEach(async () => {
    SchemaMetadataStrorage.clearMetadata();
  });

  it('Getter/Setter', () => {
    const aLable = 'a';
    const aNodId = 'aId';

    const aMetadata: SchemaMetadata = {
      [SchemaMetadataKey.LABEL]: aLable,
      [SchemaMetadataKey.PROPERTIES]: Object.keys(A),
      [SchemaMetadataKey.NODE_ID]: aNodId,
    };

    SchemaMetadataStrorage.setMetadata(A, aMetadata);

    const lableToCheck: string = SchemaMetadataStrorage.getMetadataValue(
      A,
      SchemaMetadataKey.LABEL,
    );

    const metadataToCheck = SchemaMetadataStrorage.getMetadata(A);

    expect(lableToCheck).toMatch(aLable);

    expect(metadataToCheck).toMatchObject(aMetadata);
  });

  it('Check empty metadata.', () => {
    const metadataToCheck = SchemaMetadataStrorage.getMetadata(A);

    expect(metadataToCheck).toBeNull();
  });
});
