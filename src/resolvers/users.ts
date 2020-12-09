// import { User, UserPayload, Users } from "../utilities/user.type";
// import { OnlineUserInput } from "../utilities/UserInput";
// import { Mutation, PubSub, Resolver, Root, Subscription, Publisher, Arg, ObjectType, Field, Query } from "type-graphql";
// const sdk = require('node-appwrite')
// let client = new sdk.Client()
// let database = new sdk.Database(client)
// client.setEndpoint("http://localhost:8000/v1").setProject("5f95dd1177602").setKey("d3fbce616240b453fb70c802353367a4cfb482dd1d45f7cda8e63140bff12d9f246c854def609501aacc27fc7f107cb94cd989eb1d5c362da670bd532055a49cc45986e25a3ca776edecd49076ac9227ae4d0f1400d52d32744c3332b35d21bf86ee30bc955d823b8d7db1f4b59e65c84119328c3ba1fbd38950c2a5ac57bdc9")
// let collectionId = "5fa2d6da5d053"

// @ObjectType()
// class OnlineUsersProp {
//   @Field()
//   id: string;

//   name: string;
// }

// @ObjectType()
// class OnlineUserResponse {
//   @Field()
//   users: OnlineUsersProp[]
// }

// @Resolver(User)
// export class UserResolver {
//   @Subscription({ topics: "ONLINE_USER"})
//   async onlineUser(
//     // @Root() {users}: UserPayload
//   ): Promise<Users> {
//     let promise = await database.listDocuments(collectionId);
//     let usersList = promise.documents
//     return  usersList
//   }

//   @Mutation({nullable: true})
//   async updateLastSeen(
//     @PubSub("ONLINE_USER") publish: Publisher<UserPayload>,
//     @Arg("input") input: OnlineUserInput
//   )  {
//     const user = {id: "", name: input.name}
//     const promise = await database.createDocument(collectionId, user, [], [])
//     await database.updateDocument(collectionId, promise.$id, {id: promise.$id})
//     user.id = promise.$id
//     await publish(user)
//     return null
//   }
// }