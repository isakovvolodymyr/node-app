import {User} from "@app/components/user/domain/model/User";
import {UserLoginDTO} from "@app/components/auth/application/dto/user.login";

export default interface AuthServiceInterface {
    login(userLoginDTO: UserLoginDTO): Promise<User>
}