import { Field, InputType } from "type-graphql";

@InputType()
export class MessageInput {
  @Field()
  message: string;
  @Field()
  senderName: string;
}