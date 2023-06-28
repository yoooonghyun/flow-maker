import { SchemaMetadataKey } from '../schema/schema.metadata';
import { SchemaMetadataStrorage } from '../schema/schema.metadata.storage';
import { SchemaDecorator } from './schema.decorator';

describe('SchemaMetadataStrorage', () => {
  afterEach(async () => {
    SchemaMetadataStrorage.clearMetadata();
  });

  it('Check decorator.', () => {
    const aLable = 'a';

    @SchemaDecorator.Node(aLable)
    class A {
      @SchemaDecorator.NodeId()
      public readonly aId: number;
      @SchemaDecorator.Property()
      public readonly stringValue: string;
    }

    const lableToCheck: string = SchemaMetadataStrorage.getMetadataValue(
      A,
      SchemaMetadataKey.LABEL,
    );

    const metadataToCheck = SchemaMetadataStrorage.getMetadata(A);

    expect(lableToCheck).toMatch(aLable);

    expect(metadataToCheck).toBeTruthy();

    expect(metadataToCheck[SchemaMetadataKey.PROPERTIES].length).toEqual(2);
  });

  it('Check unregistered node class.', () => {
    class A {
      public readonly aId: number;
      public readonly stringValue: string;
    }

    const metadataToCheck = SchemaMetadataStrorage.getMetadata(A);

    expect(metadataToCheck).toBeNull();
  });
});
