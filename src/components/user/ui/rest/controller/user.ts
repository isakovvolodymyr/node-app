import BaseContext from "koa";
import {request, summary, path, responsesAll, tagsAll} from "koa-swagger-decorator";
import {validate, ValidationError} from "class-validator";
import UserServiceInterface from "@app/components/user/application/service/user.interface";
import {User} from "@app/components/user/domain/model/User";
import {Bind} from "@app/core/decorators/bind"
import * as HttpStatus from 'http-status-codes';
import {CreateUserDTO} from "@app/components/user/application/dto/user.create";
import {injectable, inject} from "tsyringe";

@responsesAll({
    200: {description: "success"},
    400: {description: "bad request"},
    401: {description: "unauthorized, missing/wrong jwt token"}
})
@tagsAll(["User"])
@injectable()
export default class UserController {
    constructor (@inject("UserServiceInterface") private userService: UserServiceInterface) {}

    @Bind
    @request("get", "/users")
    @summary("Find all users")
    public async getUsers(ctx: BaseContext.Context): Promise<void> {
        ctx.status = HttpStatus.OK;
        ctx.body = await this.userService.getUsers();
    }

    @Bind
    @request("get", "/users/{id}")
    @summary("Find user by id")
    @path({
        id: {type: "number", required: true, description: "id of user"}
    })
    public async getUser(ctx: BaseContext.Context): Promise<void> {
        const result: User | undefined = await this.userService.getUser(String(ctx.params.id));

        if (undefined === result) {
            ctx.throw(HttpStatus.NOT_FOUND);
        }

        ctx.status = HttpStatus.OK;
        ctx.body = result;
    }

    @Bind
    @request("post", "/users")
    @summary("Create a user")
    public async createUser(ctx: BaseContext.Context): Promise<void> {
        const createUserDTO: CreateUserDTO = ctx.request.body as CreateUserDTO;

        // validate user entity
        const errors: ValidationError[] = await validate(createUserDTO); // errors is an array of validation errors

        if (errors.length > 0) {
            // return BAD REQUEST status code and errors array
            ctx.status = HttpStatus.BAD_REQUEST;
            ctx.body = errors;
        } else {
            const user: User = await this.userService.save(createUserDTO);
            // return CREATED status code and updated user
            ctx.status = HttpStatus.CREATED;
            ctx.body = user;
        }
    }
}
