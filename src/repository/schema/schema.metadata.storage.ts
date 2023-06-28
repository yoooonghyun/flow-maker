import { Type } from '@nestjs/common';
import { ClassType } from 'src/common/type/type';
import {
  SchemaMetadatValue,
  SchemaMetadata,
  SchemaMetadataKey,
} from 'src/repository/schema/schema.metadata';

export class SchemaMetadataStrorage {
  private static readonly metadataMaps: Map<ClassType, SchemaMetadata> =
    new Map();

  public static getMetadata(model: ClassType): SchemaMetadata {
    return this.metadataMaps.get(model) ?? null;
  }

  public static setMetadata(model: ClassType, metadata: SchemaMetadata): void {
    this.metadataMaps.set(model, metadata);
  }

  public static getMetadataValue<T extends SchemaMetadatValue>(
    model: Type,
    key: SchemaMetadataKey,
  ): T {
    const metadata = this.metadataMaps.get(model);

    if (metadata) return metadata[key] as T;
    else return null;
  }

  public static clearMetadata(): void {
    this.metadataMaps.clear();
  }
}
