import { Injectable, Scope, Type } from '@nestjs/common';
import neo4j, { Driver, Session, QueryResult, Record } from 'neo4j-driver';
import { SchemaMetadata, SchemaMetadataKey } from './schema/schema.metadata';
import { SchemaMetadataStrorage } from './schema/schema.metadata.storage';
import { ObjectList } from 'src/common/type/type';
import { NodeInput } from './node/node.input';
import { StringUtils } from 'src/utils/string.utils';
import { WhereArgs, WhereParser } from './where/where';

/**
 * Repository class for data access. This class depend on neo4j-driver.
 * The dependency should be resolved.
 * @class
 */
@Injectable({ scope: Scope.REQUEST })
export class Repository {
  /**
   * Session instance of neo4j-driver. Queries are requested through session.
   * @member
   * @private
   * @readonly
   */
  private readonly session: Session;
  /**
   * Alias of node. This value is used for querying.
   * @member
   * @private
   * @readonly
   */
  private readonly nodeAlias: string;
  /**
   * Create instance of Repository.
   * Load neo4j driver and create session.
   * @constant
   */
  constructor() {
    const driver: Driver = neo4j.driver('bolt://localhost:7687');
    this.session = driver.session();
    this.nodeAlias = 'n';
  }

  public async create<T>(schema: Type<T>, properties: T): Promise<T> {
    const label: string = SchemaMetadataStrorage.getMetadataValue(
      schema,
      SchemaMetadataKey.LABEL,
    );

    const result: QueryResult = await this.session.run(
      `CREATE (${this.nodeAlias}:${label}) 
        SET ${this.nodeAlias} = $properties
        RETURN ${this.nodeAlias}`,
      { properties: properties },
    );

    return this.getPropsFromResult(result, this.nodeAlias)[0];
  }

  public async createRelation<FromType, ToType>(
    from: NodeInput<FromType>,
    to: NodeInput<ToType>,
    relationType: string,
  ): Promise<void> {
    const fromMetadata: SchemaMetadata = SchemaMetadataStrorage.getMetadata(
      from.schema,
    );
    const toMetadata: SchemaMetadata = SchemaMetadataStrorage.getMetadata(
      to.schema,
    );

    const fromAlias = 'f';
    const toAlias = 't';

    const relaionSnake: string = StringUtils.toSnakeCase(relationType);

    await this.session.run(
      `MATCH (${fromAlias}:${fromMetadata.LABEL}), (${toAlias}:${toMetadata.LABEL})
        WHERE ${fromAlias}.${fromMetadata.NODE_ID} = $fromId AND ${toAlias}.${toMetadata.NODE_ID} = $toId
        CREATE (${fromAlias})-[:${relaionSnake}]->(${toAlias})`,
      { relationType: relationType, fromId: from.nodeId, toId: to.nodeId },
    );
  }

  public async read<T>(schema: Type<T>, nodeId: string): Promise<T | null> {
    const metadata = SchemaMetadataStrorage.getMetadata(schema);

    const result: QueryResult<T> = await this.session.run(
      `MATCH (${this.nodeAlias}:${metadata.LABEL})
        WHERE ${this.nodeAlias}.${metadata.NODE_ID} = $nodeId
        RETURN ${this.nodeAlias}
        LIMIT 1`,
      { nodeId: nodeId },
    );
    if (result.records.length === 0) {
      return null;
    }

    return this.getPropsFromResult(result, this.nodeAlias)[0];
  }

  public async readMany<T>(schema: Type<T>): Promise<ObjectList<T>> {
    const metadata = SchemaMetadataStrorage.getMetadata(schema);

    const result: QueryResult<T> = await this.session.run(
      `MATCH (${this.nodeAlias}:${metadata.LABEL})
        RETURN ${this.nodeAlias}`,
    );

    return {
      list: this.getPropsFromResult(result, this.nodeAlias),
    };
  }

  public async updateById<T>(
    schema: Type<T>,
    nodeId: string,
    updatedNode: T,
  ): Promise<T> {
    const metadata = SchemaMetadataStrorage.getMetadata(schema);

    const result: QueryResult<T> = await this.session.run(
      `MATCH (${this.nodeAlias}:${metadata.LABEL})
        WHERE ${this.nodeAlias}.${metadata.NODE_ID} = $nodeId
        SET ${this.nodeAlias} = $properties
        RETURN ${this.nodeAlias}`,
      { nodeId: nodeId, properties: updatedNode },
    );

    return this.getPropsFromResult(result, this.nodeAlias)[0];
  }

  public async partialUpdate<T>(
    schema: Type<T>,
    whereArgs: WhereArgs<T>,
    updatedNode: Partial<T>,
  ): Promise<T[]> {
    const metadata = SchemaMetadataStrorage.getMetadata(schema);

    const result: QueryResult<T> = await this.session.run(
      `MATCH (${this.nodeAlias}:${metadata.LABEL})
        ${WhereParser.getWhereClause(this.nodeAlias, whereArgs)}
        SET ${this.nodeAlias} += $properties
        RETURN ${this.nodeAlias}`,
      { properties: updatedNode },
    );

    return this.getPropsFromResult(result, this.nodeAlias);
  }

  public async deleteById<T>(schema: Type<T>, nodeId: string): Promise<T> {
    const metadata = SchemaMetadataStrorage.getMetadata(schema);

    const retAs = 'ret';

    const result: QueryResult = await this.session.run(
      `MATCH (${this.nodeAlias}:${metadata.LABEL})
        WITH ${this.nodeAlias}, properties(${this.nodeAlias}) AS ${retAs}
        WHERE ${this.nodeAlias}.${metadata.NODE_ID} = $nodeId
        DELETE ${this.nodeAlias}
        RETURN ${retAs}`,
      { nodeId: nodeId },
    );

    return this.getReturnFromResult(result, retAs)[0];
  }

  public async delete<T>(schema: Type<T>, whereArgs: WhereArgs<T>): Promise<T> {
    const metadata = SchemaMetadataStrorage.getMetadata(schema);

    const retAs = 'ret';

    const result: QueryResult = await this.session.run(
      `MATCH (${this.nodeAlias}:${metadata.LABEL})
        WITH ${this.nodeAlias}, properties(${this.nodeAlias}) AS ${retAs}
        ${WhereParser.getWhereClause(this.nodeAlias, whereArgs)}
        DELETE ${this.nodeAlias}
        RETURN ${retAs}`,
    );

    return this.getReturnFromResult(result, retAs)[0];
  }

  public async deleteAll<T>(schema: Type<T>): Promise<T[]> {
    const metadata = SchemaMetadataStrorage.getMetadata(schema);

    const retAs = 'ret';

    const result: QueryResult = await this.session.run(
      `MATCH (${this.nodeAlias}:${metadata.LABEL})
        WITH ${this.nodeAlias}, properties(${this.nodeAlias}) AS ${retAs}
        DELETE ${this.nodeAlias}
        RETURN ${retAs}`,
    );

    return this.getReturnFromResult(result, retAs);
  }

  private getReturnFromResult<T>(
    result: QueryResult<T>,
    returnAs: string,
  ): T[] {
    const nodes: Record[] = result.records;

    return nodes.map((n) => n.get(returnAs));
  }

  private getPropsFromResult<T>(result: QueryResult<T>, returnAs: string): T[] {
    const nodes: Record[] = result.records;

    return nodes.map((n) => n.get(returnAs).properties);
  }
}
