import { MessageInput } from "../utilities/MessageInput";
import { Mutation, PubSub, Resolver, Root, Subscription, Publisher, Arg, ObjectType, Field, Query } from "type-graphql";

import { Message, MessagePayload } from "../utilities/message.type"

const sdk = require('node-appwrite')
let client = new sdk.Client()
let database = new sdk.Database(client)
client.setEndpoint("http://localhost:8000/v1").setProject("5f95dd1177602").setKey("d3fbce616240b453fb70c802353367a4cfb482dd1d45f7cda8e63140bff12d9f246c854def609501aacc27fc7f107cb94cd989eb1d5c362da670bd532055a49cc45986e25a3ca776edecd49076ac9227ae4d0f1400d52d32744c3332b35d21bf86ee30bc955d823b8d7db1f4b59e65c84119328c3ba1fbd38950c2a5ac57bdc9")
let collectionId = "5fa193d15f125"

@ObjectType()
class MessageProp {
  @Field()
  message: string;

  @Field()
  senderName: string;

  @Field()
  id: string;
}

@ObjectType()
class MessageResponse {
  @Field(() => MessageProp)
  message?: MessageProp

  @Field(() => [MessageProp])
  messages?: MessageProp[]
}

@Resolver(Message)
export class MessageResolver {
  @Subscription({ topics: "MESSAGE"})
  newMessage(
    @Root() {id, message, senderName}: MessagePayload
  ): Message {
    return {
      id, message, senderName
    }
  }

  @Mutation(() => MessageResponse, {nullable: true})
  async send(
    @PubSub("MESSAGE") publish: Publisher<MessagePayload>,
    @Arg("input") input: MessageInput,
  ): Promise<MessageResponse>{
    // const lastMessage = await database.listDocuments(collectionId, [], null, null, "", "DESC", "", "", 0, 1)
    // console.log(lastMessage)
    const message = {
      message: input.message,
      senderName: input.senderName,
      id: "default"
    }
    let promise = await database.createDocument(collectionId, {id: message.id, message: message.message, senderName: message.senderName}, [], [])
    await database.updateDocument(collectionId, promise.$id, {id: promise.$id})
    console.log(`${message.senderName} sent a message`)
    message.id = promise.$id
    await publish({id: message.id, message: message.message, senderName: message.senderName})
    return {message}
  }

  @Query(() => MessageResponse, {nullable: true})
  async allMessages(): Promise<MessageResponse> {
    let promise = await database.listDocuments(collectionId);
    let messages = promise.documents
    console.log("GET allmessages")
    return {messages}
  }
}