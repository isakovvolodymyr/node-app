import {User} from "@app/components/user/domain/model/User";
import UserInterface from "./user.interface";
import UserRepositoryInterface from "@app/components/user/domain/repository/user.repository.interface";
import {CreateUserDTO} from "@app/components/user/application/dto/user.create";
import {inject, injectable} from "tsyringe";
import bcrypt from "bcrypt";

@injectable()
export default class UserService implements UserInterface {

    constructor(@inject("UserRepositoryInterface") private userRepository: UserRepositoryInterface) {
    }

    public async getUsers(): Promise<User[]> {
        // load all users
        return await this.userRepository.getUsers();
    }

    public async getUser(id: string): Promise<User | undefined> {
        return await this.userRepository.getUser(id);
    }

    public async save(userCreateDTO: CreateUserDTO): Promise<User> {
        const user: User = new User();

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(userCreateDTO.getPassword(), salt);

        return await this.userRepository.save(user.create(userCreateDTO.getName(), userCreateDTO.getEmail(), passwordHash, userCreateDTO.getAge()));
    }
}
