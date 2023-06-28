import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SchemaDecorator } from 'src/repository/decorator/schema.decorator';
import { UserRole } from './user.constant';

@SchemaDecorator.Node('user')
@ObjectType({ description: 'User object.' })
export class User {
  @SchemaDecorator.NodeId()
  @Field(() => Int, { description: 'Account id.' })
  public readonly userId: string;

  @SchemaDecorator.Property()
  @Field(() => String, {
    description:
      'Password for login. Values should be ecryped by one-way encryption.',
  })
  public readonly password: string;

  @SchemaDecorator.Property()
  @Field(() => Date, { description: 'User created timestamp.' })
  public readonly createdAt: Date;

  @SchemaDecorator.Property()
  @Field(() => Date, { description: 'User updated timestamp.' })
  public readonly updatedAt: Date;

  @SchemaDecorator.Property()
  @Field(() => String, {
    description: 'Role of user. Authority is controlled by role.',
  })
  public readonly userRole: UserRole;
}
