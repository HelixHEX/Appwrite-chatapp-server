import { Field, InputType } from "type-graphql";

@InputType()
export class OnlineUserInput {
  @Field()
  id: string;

  @Field()
  name: string;
}