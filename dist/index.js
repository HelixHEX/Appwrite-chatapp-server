"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const messages_1 = require("./resolvers/messages");
const test_1 = require("./resolvers/test");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.use(cors_1.default({
        origin: ["http://192.168.1.219:3000/", "http://localhost:3000", "https://chatapplication.vercel.app", "https://appwritechatapp.netlify.app/"],
        credentials: true,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [messages_1.MessageResolver, test_1.TestResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    apolloServer.applyMiddleware({ app, cors: false });
    const subscriptionsServer = http_1.createServer(app);
    apolloServer.installSubscriptionHandlers(subscriptionsServer);
    subscriptionsServer.listen(5000, () => {
        console.log(`🚀 Server ready at http://localhost:5000${apolloServer.graphqlPath}`);
        console.log(`🚀 Subscriptions ready at ws://localhost:5000${apolloServer.subscriptionsPath}`);
    });
});
main();
//# sourceMappingURL=index.js.map