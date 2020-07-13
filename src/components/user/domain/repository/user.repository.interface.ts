import {User} from "@app/components/user/domain/model/User";

export default interface UserRepositoryInterface {
    getUsers(): Promise<User[]>;
    getUser(id: string): Promise<User | undefined>;
    save(userToBeSaved: User): Promise<User>
    byEmail(email: string): Promise<User>;
}