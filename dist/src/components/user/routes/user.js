"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const user_1 = __importDefault(require("@app/components/user/controller/user"));
const userRouter = new koa_router_1.default();
exports.userRouter = userRouter;
userRouter
    .get("/users", user_1.default.getUsers)
    .get("/users/:id", user_1.default.getUser)
    .post("/users", user_1.default.createUser);
//# sourceMappingURL=user.js.map