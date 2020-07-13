import {inject, injectable} from "tsyringe";
import {SendMessageDTO} from "@app/components/chat/application/dto/send.message";
import ChatServiceInterface from "@app/components/chat/application/service/chat.interface";
import {Message} from "@app/components/chat/domain/model/Message";
import MessageRepositoryInterface from "@app/components/chat/domain/repository/message.repository.interface";

@injectable()
export default class ChatService implements ChatServiceInterface {

    constructor(@inject("MessageRepositoryInterface") private messageRepository: MessageRepositoryInterface) {
    }

    public async send(sendMessageDTO: SendMessageDTO): Promise<Message> {
        const message: Message = new Message();

        return await this.messageRepository.save(message.create(sendMessageDTO.getMessage(), sendMessageDTO.getUserId()));
    }
}
