import Router from 'koa-router';
import AuthController from '@app/components/auth/ui/rest/controller/auth'
import {container} from "@app/di";

const authRouter = new Router();
const authController: AuthController = container.resolve(AuthController);

authRouter
    .post("/login", authController.login);

export {authRouter};
