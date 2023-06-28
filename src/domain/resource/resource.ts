import { Field, ObjectType } from '@nestjs/graphql';
import { StorageType } from 'src/domain/resource/source.constant';
import { SchemaDecorator } from 'src/repository/decorator/schema.decorator';
import { TimeUtils } from 'src/utils/time.utils';
import { DataUtils } from 'src/utils/data.utils';
import { DateStringScalar } from 'src/common/scalar/date.string.scalar';

export * from 'src/domain/resource/source.constant';

/**
 * Schema class representing resource (basically file).
 * This class is used to describe a resource that will be used for tasks.
 * @class
 */
@SchemaDecorator.Node('resource')
@ObjectType()
export class Resource {
  /**
   * Unique id used to identify the resource.
   * @property {string}
   */
  @SchemaDecorator.NodeId()
  @Field(() => String, { description: 'Unique id. Auto-generated value.' })
  public readonly resourceId: string;

  /**
   * Time when the resource was uploaded.
   * @property {string}
   */
  @SchemaDecorator.Property()
  @Field(() => DateStringScalar, { description: 'Resource created time.' })
  public readonly createdAt: string;

  /**
   * Domain address of the storage where the resource is uploaded.
   * @property {string}
   */
  @SchemaDecorator.Property()
  @Field(() => String, { description: 'Domain of resource storage.' })
  public readonly domain: string;

  /**
   * Relative path to the resource in the storage.
   * @property {string}
   */
  @SchemaDecorator.Property()
  @Field(() => String, { description: 'Relative path to resource.' })
  public readonly path: string;

  /**
   * Type of storage where the resource is uploaded.
   * @property {StorageType}
   */
  @SchemaDecorator.Property()
  @Field(() => StorageType, {
    description: 'Storage type where resource uplaoded.',
  })
  public readonly storageType: StorageType;

  constructor() {
    this.resourceId = DataUtils.generateUuid();
    this.createdAt = TimeUtils.now().toJSON();
  }
}
