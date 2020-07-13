import {container} from "tsyringe";
import UserServiceInterface from "@app/components/user/application/service/user.interface";
import UserService from '@app/components/user/application/service/user'
import UserRepositoryInterface from "@app/components/user/domain/repository/user.repository.interface";
import MongoUserRepository from "@app/components/user/infrastructure/repository/mongo.user.repository";
import AuthService from "@app/components/auth/application/service/auth";
import ChatServiceInterface from "@app/components/chat/application/service/chat.interface";
import ChatService from "@app/components/chat/application/service/chat";
import MongoMessageRepository from "@app/components/chat/infrastructure/repository/mongo.message.repository";

container.register("UserServiceInterface", {
    useClass: UserService
});
//auth
container.register("AuthServiceInterface", {
    useClass: AuthService
});
//chat
container.register("ChatServiceInterface", {
    useClass: ChatService
});
container.register("UserRepositoryInterface", {
    useClass: MongoUserRepository
});
container.register("MessageRepositoryInterface", {
    useClass: MongoMessageRepository
});

export {container}