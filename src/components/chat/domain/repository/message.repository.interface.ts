import {Message} from "@app/components/chat/domain/model/Message";

export default interface MessageRepositoryInterface {
    save(messageToBeSaved: Message): Promise<Message>
}