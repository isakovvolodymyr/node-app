import {User} from "@app/components/user/domain/model/User";
import {CreateUserDTO} from "@app/components/user/application/dto/user.create";

export default interface UserInterface {
    getUsers(): Promise<User[]>;
    getUser(id: string): Promise<User | undefined>;
    save(userCreateDTO: CreateUserDTO): Promise<User>
}