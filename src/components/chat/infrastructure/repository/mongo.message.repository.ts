import MessageRepositoryInterface from "@app/components/chat/domain/repository/message.repository.interface";
import {Message} from "@app/components/chat/domain/model/Message";
import {getRepository, Repository} from "typeorm";

export default class MongoMessageRepository implements MessageRepositoryInterface {
    public async save(messageToBeSaved: Message): Promise<Message> {
        const message: Message = await MongoMessageRepository.getRepository().save(messageToBeSaved);

        return message;
    }

    private static getRepository(): Repository<Message> {
        // get a user repository to perform operations with user
        return getRepository(Message);
    }
}