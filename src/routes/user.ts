import Router from 'koa-router';
import UserController from '@app/components/user/ui/rest/controller/user'
import RegistrationController from '@app/components/user/ui/rest/controller/registration'
import ChatController from '@app/components/chat/ui/rest/controller/chat'
import {container} from "@app/di";
import {verifyTokenHandler} from '@app/core/middleware/verifyTokenHandler';

const userRouter = new Router();
const userController: UserController = container.resolve(UserController);
const registrationController: RegistrationController = container.resolve(RegistrationController);
const chatController = container.resolve(ChatController);

userRouter
    .get("/users", verifyTokenHandler, userController.getUsers)
    .get("/users/:id", verifyTokenHandler, userController.getUser)
    .post("/registration", registrationController.registration)
    .post("/users", verifyTokenHandler, userController.createUser)
    .get("/chat", chatController.getView);

export {userRouter};
