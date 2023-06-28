import 'reflect-metadata';
import { SchemaMetadata, SchemaMetadataKey } from '../schema/schema.metadata';
import { SchemaMetadataStrorage } from '../schema/schema.metadata.storage';
import { ClassType } from 'src/common/type/type';

/**
 * Namespace for decorators that describe Graph Database Schema.
 * @class
 */
export class SchemaDecorator {
  /**
   * Decorator for defining a node in the graph.
   * The name of the node is specified by the label.
   * This decorator is applied to the model class.
   * @method
   * @public
   * @static
   * @param label - Name of the node.
   * @returns {ClassDecorator}
   */
  public static Node(label: string): ClassDecorator {
    return function (target: ClassType): void {
      const id: string = Reflect.getMetadata(SchemaMetadataKey.NODE_ID, target);

      const properties: string[] = Reflect.getMetadata(
        SchemaMetadataKey.PROPERTIES,
        target,
      );

      const metadata: SchemaMetadata = {
        [SchemaMetadataKey.LABEL]: label,
        [SchemaMetadataKey.NODE_ID]: id ?? null,
        [SchemaMetadataKey.PROPERTIES]: properties ?? [],
      };

      Reflect.defineMetadata(SchemaMetadataKey.LABEL, label, target);
      SchemaMetadataStrorage.setMetadata(target, metadata);
    };
  }

  /**
   * Decorator for defining a property of a node.
   * This decorator is applied to each property.
   * @method
   * @public
   * @static
   * @returns {PropertyDecorator}
   */
  public static Property(): PropertyDecorator {
    return function (target: object, propertyKey: string): void {
      const classObj = target.constructor;
      const properties: string[] =
        Reflect.getMetadata(SchemaMetadataKey.PROPERTIES, classObj) ?? [];

      properties.push(propertyKey);

      Reflect.defineMetadata(
        SchemaMetadataKey.PROPERTIES,
        properties,
        classObj,
      );
    };
  }

  /**
   * Decorator for defining the identifier (primary key) of a node.
   * This decorator is applied to the id property of the node.
   * NodeId includes the functionality of the Property decorator.
   * @method
   * @public
   * @static
   * @returns {PropertyDecorator}
   */
  public static NodeId(): PropertyDecorator {
    return function (target: object, propertyKey: string): void {
      const classObj = target.constructor;
      const properties: string[] =
        Reflect.getMetadata(SchemaMetadataKey.PROPERTIES, classObj) ?? [];

      properties.push(propertyKey);

      Reflect.defineMetadata(
        SchemaMetadataKey.PROPERTIES,
        properties,
        classObj,
      );

      Reflect.defineMetadata(SchemaMetadataKey.NODE_ID, propertyKey, classObj);
    };
  }
}
