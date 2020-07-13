import {User} from "@app/components/user/domain/model/User";
import AuthServiceInterface from "./auth.interface";
import UserRepositoryInterface from "@app/components/user/domain/repository/user.repository.interface";
import {inject, injectable} from "tsyringe";
import {UserLoginDTO} from "@app/components/auth/application/dto/user.login";
import bcrypt from "bcrypt";
import {UserNotFoundException} from "@app/components/auth/domain/exception/userNotFoundException";
import {EmailOrPasswordNotFoundException} from "@app/components/auth/domain/exception/emailOrPasswordNotFoundException";

@injectable()
export default class AuthService implements AuthServiceInterface {

    constructor(@inject("UserRepositoryInterface") private userRepository: UserRepositoryInterface) {
    }

    public async login(userLoginDTO: UserLoginDTO): Promise<User> {

        const user: User | undefined = await this.userRepository.byEmail(userLoginDTO.email);

        if (undefined === user) {
            throw new UserNotFoundException('auth.user_not_found');
        }

        const validPassword = await bcrypt.compare(userLoginDTO.password, user.getPassword());

        if (!validPassword) {
            throw new EmailOrPasswordNotFoundException('auth.incorrect_email_or_password');
        }

        return user;
    }
}
