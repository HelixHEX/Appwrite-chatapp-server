"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResolver = void 0;
const MessageInput_1 = require("../utilities/MessageInput");
const type_graphql_1 = require("type-graphql");
const message_type_1 = require("../utilities/message.type");
const sdk = require('node-appwrite');
let client = new sdk.Client();
let database = new sdk.Database(client);
client.setEndpoint("http://localhost:8000/v1").setProject("5f95dd1177602").setKey("d3fbce616240b453fb70c802353367a4cfb482dd1d45f7cda8e63140bff12d9f246c854def609501aacc27fc7f107cb94cd989eb1d5c362da670bd532055a49cc45986e25a3ca776edecd49076ac9227ae4d0f1400d52d32744c3332b35d21bf86ee30bc955d823b8d7db1f4b59e65c84119328c3ba1fbd38950c2a5ac57bdc9");
let collectionId = "5fa516ec7ce41";
let MessageProp = class MessageProp {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MessageProp.prototype, "message", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MessageProp.prototype, "senderName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MessageProp.prototype, "id", void 0);
MessageProp = __decorate([
    type_graphql_1.ObjectType()
], MessageProp);
let MessageResponse = class MessageResponse {
};
__decorate([
    type_graphql_1.Field(() => MessageProp),
    __metadata("design:type", MessageProp)
], MessageResponse.prototype, "message", void 0);
__decorate([
    type_graphql_1.Field(() => [MessageProp]),
    __metadata("design:type", Array)
], MessageResponse.prototype, "messages", void 0);
MessageResponse = __decorate([
    type_graphql_1.ObjectType()
], MessageResponse);
let MessageResolver = class MessageResolver {
    newMessage({ id, message, senderName }) {
        return {
            id, message, senderName
        };
    }
    send(publish, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = {
                message: input.message,
                senderName: input.senderName,
                id: "default",
                createdAt: ""
            };
            let promise = yield database.createDocument(collectionId, { id: message.id, message: message.message, senderName: message.senderName }, [], []);
            yield database.updateDocument(collectionId, promise.$id, { id: promise.$id });
            console.log(`${message.senderName} sent a message`);
            message.id = promise.$id;
            yield publish({ id: message.id, message: message.message, senderName: message.senderName });
            return { message };
        });
    }
    allMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            let promise = yield database.listDocuments(collectionId);
            let messages;
            let limit;
            if (parseInt(promise.sum) > 25) {
                let queryOffset = promise.sum - 25;
                limit = 25;
                console.log(limit);
                let newMessages = yield database.listDocuments(collectionId, [], queryOffset, 25);
                messages = newMessages.documents;
                return { messages };
            }
            console.log(promise.stum);
            messages = promise.documents;
            console.log("GET allmessages");
            return { messages };
        });
    }
    allMessagess() {
        return __awaiter(this, void 0, void 0, function* () {
            let promise = yield database.listDocuments(collectionId);
            let messages;
            let limit;
            if (parseInt(promise.sum) > 25) {
                let queryOffset = promise.sum - 25;
                limit = 25;
                console.log(limit);
                let newMessages = yield database.listDocuments(collectionId, [], queryOffset, 25);
                messages = newMessages.documents;
                return { messages };
            }
            console.log(promise.stum);
            messages = promise.documents;
            console.log("GET allmessages");
            return { messages };
        });
    }
    test() {
        return 'hi';
    }
    hi() {
        return __awaiter(this, void 0, void 0, function* () {
            let promise = yield database.listDocuments(collectionId);
            let messages;
            let limit;
            if (parseInt(promise.sum) > 25) {
                let queryOffset = promise.sum - 25;
                limit = 25;
                console.log(limit);
                let newMessages = yield database.listDocuments(collectionId, [], queryOffset, 25);
                messages = newMessages.documents;
                return { messages };
            }
            console.log(promise.stum);
            messages = promise.documents;
            console.log("GET allmessages");
            return { messages };
        });
    }
};
__decorate([
    type_graphql_1.Subscription({ topics: "MESSAGE" }),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", message_type_1.Message)
], MessageResolver.prototype, "newMessage", null);
__decorate([
    type_graphql_1.Mutation(() => MessageResponse, { nullable: true }),
    __param(0, type_graphql_1.PubSub("MESSAGE")),
    __param(1, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, MessageInput_1.MessageInput]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "send", null);
__decorate([
    type_graphql_1.Query(() => MessageResponse, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "allMessages", null);
__decorate([
    type_graphql_1.Query(() => MessageResponse, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "allMessagess", null);
__decorate([
    type_graphql_1.Query({ nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], MessageResolver.prototype, "test", null);
__decorate([
    type_graphql_1.Query(() => MessageResponse, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "hi", null);
MessageResolver = __decorate([
    type_graphql_1.Resolver(message_type_1.Message)
], MessageResolver);
exports.MessageResolver = MessageResolver;
//# sourceMappingURL=messages.js.map