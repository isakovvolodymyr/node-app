import UserRepositoryInterface from "@app/components/user/domain/repository/user.repository.interface";
import {User} from "@app/components/user/domain/model/User";
import {getRepository, Repository} from "typeorm";

export default class MongoUserRepository implements UserRepositoryInterface {
    public async getUsers(): Promise<User[]> {
        // load all users
        return await MongoUserRepository.getRepository().find();
    }

    public async getUser(id: string): Promise<User | undefined> {
        return await MongoUserRepository.getRepository().findOne(id);
    }

    public async save(userToBeSaved: User): Promise<User> {
        const user: User = await MongoUserRepository.getRepository().save(userToBeSaved);

        return user;
    }

    public async byEmail(email: string): Promise<User | undefined> {
        return await MongoUserRepository.getRepository().findOne({where: {email: email}});
    }

    private static getRepository(): Repository<User> {
        // get a user repository to perform operations with user
        return getRepository(User);
    }
}