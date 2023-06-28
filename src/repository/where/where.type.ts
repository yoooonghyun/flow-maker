export enum WhereOperator {
  EQ = '=',
  NOT_EQ = '!=',
  ST = '<',
  NOT_ST = '>=',
  LT = '>',
  NOT_LT = '<=',
  IN = 'IN',
  BT = 'BETWEEN',
}

export type ComparisonOption<T> = { [Op in WhereOperator]: T };

type BetweenOption<T> = {
  [WhereOperator.BT]: [T, T];
};

type InOption<T> = {
  [WhereOperator.IN]: T[];
};

type ComparisonValue<T> =
  | T
  | ComparisonOption<T>
  | BetweenOption<T>
  | InOption<T>;

export type WhereOptions<T> = {
  [K in keyof T]?: ComparisonValue<T[K]>;
};
