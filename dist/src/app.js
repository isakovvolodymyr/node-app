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
exports.app = void 0;
const koa_1 = __importDefault(require("koa"));
const user_1 = require("@app/components/user/routes/user");
const koa_helmet_1 = __importDefault(require("koa-helmet"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_json_1 = __importDefault(require("koa-json"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
require('dotenv').config();
const app = new koa_1.default();
exports.app = app;
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield next();
    }
    catch (err) {
        ctx.status = err.status || 500;
        ctx.body = {
            data: {
                errors: {
                    message: err.message
                }
            }
        };
        ctx.app.emit('error', err, ctx);
    }
}));
app.use(user_1.userRouter.routes()).use(user_1.userRouter.allowedMethods());
app.use(cors_1.default());
app.use(koa_helmet_1.default());
app.use(koa_json_1.default());
app.use(koa_logger_1.default());
app.use(koa_bodyparser_1.default());
//# sourceMappingURL=app.js.map