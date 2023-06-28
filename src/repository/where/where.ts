import { WhereOperator, WhereOptions } from 'src/repository/where/where.type';

export * from 'src/repository/where/where.type';

export type WhereArgs<T> = WhereOptions<T> | WhereOptions<T>[];

export class WhereParser {
  public static getWhereClause<T>(as: string, args: WhereArgs<T>): string {
    const whereClauses = Array.isArray(args)
      ? this.getWhereClauseWithOr(as, args)
      : this.getWhereClauseDefault(as, args);

    return whereClauses ? `WHERE ${whereClauses}` : '';
  }

  private static getWhereClauseDefault<T>(
    as: string,
    options: WhereOptions<T>,
  ): string {
    const whereClauses = Object.entries(options)
      .map(([key, value]) => {
        if (typeof value === 'object') {
          const operators = Object.keys(value) as WhereOperator[];
          return operators
            .map((o) => this.createWhereCondition(as, key, o, value[o]))
            .join(' AND ');
        } else {
          return this.createWhereCondition(as, key, WhereOperator.EQ, value);
        }
      })
      .join(' AND ');

    return whereClauses;
  }

  private static getWhereClauseWithOr<T>(
    as: string,
    optionsArr: WhereOptions<T>[],
  ): string {
    const whereClauses = optionsArr
      .map((option) => `(${this.getWhereClauseDefault(as, option)})`)
      .join(' OR ');

    return whereClauses;
  }

  private static createWhereCondition<T>(
    as: string,
    key: string,
    op: WhereOperator,
    value: T,
  ) {
    if (op === WhereOperator.BT) {
      const start: any = value[0];
      const end: any = value[1];
      return `${as}.${key} >= ${JSON.stringify(
        start,
      )} AND ${as}.${key} <= ${JSON.stringify(end)}`;
    } else if (op === WhereOperator.IN) {
      const inValues = Array.isArray(value) ? value : [value];
      const inValueString = inValues
        .map((v: any) => JSON.stringify(v))
        .join(', ');
      return `${as}.${key} ${op} [${inValueString}]`;
    } else {
      return `${as}.${key} ${op} ${JSON.stringify(value)}`;
    }
  }
}
