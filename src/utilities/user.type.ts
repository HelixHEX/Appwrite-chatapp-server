import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  name: string;

  @Field()
  id: string;
}

@ObjectType()
export class Users {
  @Field(() => [User])
  users: User[]
}

export interface UserPayload {
  id: string;
  name: string;
}