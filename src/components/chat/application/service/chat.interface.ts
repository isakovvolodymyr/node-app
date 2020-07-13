import {SendMessageDTO} from "@app/components/chat/application/dto/send.message";
import {Message} from "@app/components/chat/domain/model/Message";

export default interface ChatServiceInterface {
    send(sendMessageDTO: SendMessageDTO): Promise<Message>
}