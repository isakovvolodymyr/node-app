import BaseContext from "koa";
import {request, summary, responsesAll, tagsAll} from "koa-swagger-decorator";
import AuthServiceInterface from "@app/components/auth/application/service/auth.interface";
import {Bind} from "@app/core/decorators/bind"
import * as HttpStatus from 'http-status-codes';
import {injectable, inject} from "tsyringe";
import {UserLoginDTO} from "@app/components/auth/application/dto/user.login";
import {validate, ValidationError} from "class-validator";
import {User} from "@app/components/user/domain/model/User";
import jwt from 'jsonwebtoken';
require('dotenv').config();

@responsesAll({
    200: {description: "success"},
    400: {description: "bad request"},
    401: {description: "unauthorized, missing/wrong jwt token"}
})
@tagsAll(["Auth"])
@injectable()
export default class AuthController {
    constructor (@inject("AuthServiceInterface") private authService: AuthServiceInterface) {}

    @Bind
    @request("post", "/login")
    @summary("Login")
    public async login(ctx: BaseContext.Context): Promise<void> {
        const userLoginDTO: UserLoginDTO = ctx.request.body as UserLoginDTO;

        // validate user entity
        const errors: ValidationError[] = await validate(userLoginDTO); // errors is an array of validation errors

        if (errors.length > 0) {
            // return BAD REQUEST status code and errors array
            ctx.status = HttpStatus.BAD_REQUEST;
            ctx.body = errors;
        } else {
            const user: User = await this.authService.login(userLoginDTO);
            // return CREATED status code and updated user
            ctx.status = HttpStatus.OK;
            const token = jwt.sign({
                data: user
            }, process.env.JWT_SECRET, { expiresIn: '1h' });
            ctx.body = {token: token};
        }
    }
}
