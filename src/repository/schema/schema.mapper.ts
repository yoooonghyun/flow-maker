import { SchemaMetadata, SchemaMetadataKey } from './schema.metadata';

export class SchemaMapper {
  public static to<T>(model: T, metadata: SchemaMetadata, jsObj: T): object {
    const properties: string[] = metadata[
      SchemaMetadataKey.PROPERTIES
    ] as string[];

    const dbObj = properties.reduce((obj: object, propKey: string) => {
      obj[propKey] = this.propTo(jsObj[propKey]);
      return obj;
    }, {});

    return dbObj;
  }

  public static from<T>(model: T, metadata: SchemaMapper, dbObj: object): T {
    const properties: string[] = metadata[
      SchemaMetadataKey.PROPERTIES
    ] as string[];

    const jsObj = properties.reduce((obj: object, prop: string) => {
      obj[prop] = this.propFrom(dbObj[prop]);
      return obj;
    }, {});

    return jsObj as T;
  }

  private static propTo(propVal: any): any {
    return propVal;
  }

  private static propFrom(propVal: any): any {
    return propVal;
  }
}
