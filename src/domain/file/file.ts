import { Model } from 'src/domain/decorator/model';
import { Field, Int } from '@nestjs/graphql';
import { StorageType } from 'src/domain/file/file.type';
import { SchemaDecorator } from 'src/repository/decorator/repository.decorator';

export * from 'src/domain/file/file.type';

/**
 * @class
 * @description Model class representing uploaded files.
 * This class is used to describe a file that will be used for tasks.
 */
@SchemaDecorator.Node('file')
@Model({ description: 'File object.' })
export class File {
  /**
   * @property {number}
   * @description Unique id used to identify the file.
   */
  @SchemaDecorator.NodeId()
  @Field(() => Int, { description: 'Unique id. Auto-generated value.' })
  public readonly fileId: number;

  /**
   * @property {Date}
   * @description Time when the file was uploaded.
   */
  @SchemaDecorator.Property()
  @Field(() => Date, { description: 'File uploaded time.' })
  public readonly createdAt: Date;

  /**
   * @property {string}
   * @description Domain address of the storage where the file is uploaded.
   */
  @SchemaDecorator.Property()
  @Field(() => String, { description: 'Domain of file storage.' })
  public readonly domain: string;

  /**
   * @property {string}
   * @description Relative path to the file in the storage.
   */
  @SchemaDecorator.Property()
  @Field(() => String, { description: 'Relative path to file.' })
  public readonly path: string;

  /**
   * @property {StorageType}
   * @description Type of storage where the file is uploaded.
   */
  @SchemaDecorator.Property()
  @Field(() => StorageType, {
    description: 'Storage type where file uplaoded.',
  })
  public readonly storageType: StorageType;
}
