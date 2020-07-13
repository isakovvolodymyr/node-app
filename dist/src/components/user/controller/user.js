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
const koa_1 = __importDefault(require("koa"));
const koa_swagger_decorator_1 = require("koa-swagger-decorator");
const class_validator_1 = require("class-validator");
const user_1 = __importDefault(require("../service/user"));
const User_1 = require("../model/User");
let UserController = class UserController {
    static getUsers(ctx) {
        ctx.status = 200;
        ctx.body = user_1.default.getUsers();
    }
    static getUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_1.default.getUser(String(ctx.params.id));
            if (undefined === result) {
                ctx.throw(404);
            }
            ctx.status = 200;
            ctx.body = result;
        });
    }
    static createUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            // build up entity user to be saved
            const userToBeSaved = new User_1.User();
            // userToBeSaved.name = ctx.request.body.name;
            // userToBeSaved.email = ctx.request.body.email;
            // userToBeSaved.age = ctx.request.body.age;
            userToBeSaved.name = "aasdadasddad";
            userToBeSaved.email = "asda1asa30vfjd75sd@gmail.com";
            userToBeSaved.age = 23;
            // validate user entity
            const errors = yield class_validator_1.validate(userToBeSaved); // errors is an array of validation errors
            if (errors.length > 0) {
                // return BAD REQUEST status code and errors array
                ctx.status = 400;
                ctx.body = errors;
            }
            else {
                const user = yield user_1.default.save(userToBeSaved);
                // return CREATED status code and updated user
                ctx.status = 201;
                ctx.body = user;
            }
        });
    }
};
__decorate([
    koa_swagger_decorator_1.request("get", "/users"),
    koa_swagger_decorator_1.summary("Find all users"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController, "getUsers", null);
__decorate([
    koa_swagger_decorator_1.request("get", "/users/{id}"),
    koa_swagger_decorator_1.summary("Find user by id"),
    koa_swagger_decorator_1.path({
        id: { type: "number", required: true, description: "id of user" }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController, "getUser", null);
__decorate([
    koa_swagger_decorator_1.request("post", "/users"),
    koa_swagger_decorator_1.summary("Create a user"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController, "createUser", null);
UserController = __decorate([
    koa_swagger_decorator_1.responsesAll({
        200: { description: "success" },
        400: { description: "bad request" },
        401: { description: "unauthorized, missing/wrong jwt token" }
    }),
    koa_swagger_decorator_1.tagsAll(["User"])
], UserController);
exports.default = UserController;
//# sourceMappingURL=user.js.map