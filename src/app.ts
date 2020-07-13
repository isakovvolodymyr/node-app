import Koa from "koa";
import {userRouter} from '@app/routes/user';
import {authRouter} from '@app/routes/auth';
import {errorHandler} from '@app/core/middleware/errorHandler';
import {socketVerifyTokenHandler} from '@app/core/middleware/socketVerifyTokenHandler';
import helmet from "koa-helmet";
import cors from "@koa/cors";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import jwt from "koa-jwt";

require('dotenv').config();

const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

io.use(socketVerifyTokenHandler);

app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(errorHandler);
app.use(authRouter.routes()).use(authRouter.allowedMethods());
app.use(jwt({secret: process.env.JWT_SECRET}).unless({path: [/^\/registration/, /^\/login/]}));
app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(cors());
app.use(helmet());

export {app, io, server};
