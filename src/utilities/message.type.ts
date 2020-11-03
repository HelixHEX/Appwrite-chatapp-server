import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Message {
  @Field()
  message: string;

  @Field()
  senderName: string;

  @Field()
  id: string;
}

export interface MessagePayload {
  id: string;
  message: string;
  senderName: string;
}