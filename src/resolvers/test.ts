import { Resolver, Root, Subscription, ObjectType, Field, Query } from "type-graphql";

import { Message, MessagePayload } from "../utilities/message.type"

const sdk = require('node-appwrite')
let client = new sdk.Client()
let database = new sdk.Database(client)
client.setEndpoint("http://localhost:8000/v1").setProject("5f95dd1177602").setKey("d3fbce616240b453fb70c802353367a4cfb482dd1d45f7cda8e63140bff12d9f246c854def609501aacc27fc7f107cb94cd989eb1d5c362da670bd532055a49cc45986e25a3ca776edecd49076ac9227ae4d0f1400d52d32744c3332b35d21bf86ee30bc955d823b8d7db1f4b59e65c84119328c3ba1fbd38950c2a5ac57bdc9")
let collectionId = "5fa516ec7ce41"

@ObjectType()
class TestProp {
  @Field()
  message: string;

  @Field()
  senderName: string;

  @Field()
  id: string;
}

@ObjectType()
class TestResponse {
  @Field(() => TestProp)
  message?: TestProp

  @Field(() => [TestProp])
  messages?: TestProp[]
} 

@Resolver(Message)
export class TestResolver {
  @Subscription({ topics: "MESSAGE"})
  newMessage(
    @Root() {id, message, senderName}: MessagePayload
  ): Message {
    return {
      id, message, senderName
    }
  }

  @Query(() => TestResponse, {nullable: true})
  async allMessagess(
    // @Arg("input") input: AllMessagesInput,
  ): Promise<TestResponse> {
    let promise = await database.listDocuments(collectionId);
    let messages;
    let limit;
    if (parseInt(promise.sum) > 25) {
      // let offset = input.offset * 25
      let queryOffset = promise.sum - 25
      limit = 25
      // if (queryOffset < 0) {
      //   queryOffset = 0
      //   limit = offset - promise.sum
      //   console.log(limit)
      // }
      console.log(limit)
      let newMessages = await database.listDocuments(collectionId, [], queryOffset, 25)
      // console.log(newMessages)
      messages = newMessages.documents
      return {messages}
    }
    console.log(promise.stum)
    messages = promise.documents
    console.log("GET allmessages")
    return {messages}
  }

}