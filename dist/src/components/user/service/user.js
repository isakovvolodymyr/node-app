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
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../model/User");
const typeorm_1 = require("typeorm");
class UserService {
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = UserService.getRepository();
            // load all users
            const users = yield userRepository.find();
            return users;
        });
    }
    static getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = UserService.getRepository();
            return yield userRepository.findOne(id);
        });
    }
    static save(userToBeSaved) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = UserService.getRepository();
            const user = yield userRepository.save(userToBeSaved);
            return user;
        });
    }
    static getRepository() {
        // get a user repository to perform operations with user
        return typeorm_1.getManager().getRepository(User_1.User);
    }
}
exports.default = UserService;
//# sourceMappingURL=user.js.map