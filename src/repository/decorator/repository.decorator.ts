import { NodeMetadata, NodeMetadataKey } from '../node/node.metadata';
import { NodeMetadataStrorage } from '../node/node.metadata.storage';

/**
 * @class
 * @description Namespace for decorators that describe Graph Database Schema.
 */
export class SchemaDecorator {
  /**
   * @public
   * @static
   * @description Decorator for defining a node in the graph.
   * The name of the node is specified by the label.
   * This decorator is applied to the model class.
   * @param label - Name of the node.
   * @returns {ClassDecorator}
   */
  public static Node(label: string): ClassDecorator {
    return function (target: Object) {
      const id: string = Reflect.getMetadata(NodeMetadataKey.NODE_ID, target);

      const properties: string[] = Reflect.getMetadata(
        NodeMetadataKey.PROPERTIES,
        target,
      );

      const metadata: NodeMetadata = {
        [NodeMetadataKey.LABEL]: label,
        [NodeMetadataKey.NODE_ID]: id ?? null,
        [NodeMetadataKey.PROPERTIES]: properties ?? [],
      };

      Reflect.defineMetadata(NodeMetadataKey.LABEL, label, target);
      NodeMetadataStrorage.setMetadata(label, metadata);
    };
  }

  /**
   * @public
   * @static
   * @description Decorator for defining a property of a node.
   * This decorator is applied to each property.
   * @returns {PropertyDecorator}
   */
  public static Property(): PropertyDecorator {
    return function (target: Object, propertyKey: string) {
      const properties: string[] =
        Reflect.getMetadata(NodeMetadataKey.PROPERTIES, target) ?? [];

      properties.push(propertyKey);

      Reflect.defineMetadata(NodeMetadataKey.PROPERTIES, properties, target);
    };
  }

  /**
   * @public
   * @static
   * @description Decorator for defining the identifier (primary key) of a node.
   * This decorator is applied to the id property of the node.
   * NodeId includes the functionality of the Property decorator.
   * @returns {PropertyDecorator}
   */
  public static NodeId(): PropertyDecorator {
    return function (target: Object, propertyKey: string) {
      const properties: string[] =
        Reflect.getMetadata(NodeMetadataKey.PROPERTIES, target) ?? [];

      properties.push(propertyKey);

      Reflect.defineMetadata(NodeMetadataKey.PROPERTIES, properties, target);

      Reflect.defineMetadata(NodeMetadataKey.NODE_ID, propertyKey, target);
    };
  }
}
