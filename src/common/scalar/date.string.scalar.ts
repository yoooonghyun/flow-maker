import { Kind, GraphQLScalarType, ValueNode } from 'graphql';

export const DateStringScalar = new GraphQLScalarType<string, string>({
  name: 'DateString',
  description:
    'Date custom scalar type. This data type represents a timestamp in ISO 8601 format.',
  serialize(value: string): string {
    return new Date(value).toJSON();
  },
  parseValue(value: string): string {
    return value;
  },
  parseLiteral(ast: ValueNode): string | null {
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    return null;
  },
});
