import "reflect-metadata";
import express from "express";
import { createServer } from "http";
import cors from "cors";


//graphql
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { MessageResolver } from "./resolvers/messages";
import { TestResolver } from './resolvers/test'
//appwrite
const main = async () => {
  const app = express();

  app.use(
    cors({
      origin: ["http://192.168.1.219:3000/", "http://localhost:3000", "https://chatapplication.vercel.app", "https://appwritechatapp.netlify.app/"],
      credentials: true,
    })
  );
  //setup apollo server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [MessageResolver, TestResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  //subscriptions
  const subscriptionsServer = createServer(app);
  apolloServer.installSubscriptionHandlers(subscriptionsServer);

  subscriptionsServer.listen(5000, () => {
    console.log(`🚀 Server ready at http://localhost:5000${apolloServer.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:5000${apolloServer.subscriptionsPath}`);
  });
}

main()