import BaseContext from "koa";
import {request, responsesAll, tagsAll} from "koa-swagger-decorator";
import * as HttpStatus from 'http-status-codes';
import {injectable} from "tsyringe";
import { createReadStream } from 'fs';

@responsesAll({
    200: {description: "success"},
    400: {description: "bad request"},
    401: {description: "unauthorized, missing/wrong jwt token"}
})
@tagsAll(["Chat"])
@injectable()
export default class ChatController {

    @request("get", "/chat")
    public async getView(ctx: BaseContext.Context): Promise<void> {
        ctx.status = HttpStatus.OK;
        ctx.body = 'asdasd';
    }
}
