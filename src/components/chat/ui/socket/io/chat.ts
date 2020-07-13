import {io} from '../../../../../app';
import ChatServiceInterface from "@app/components/chat/application/service/chat.interface";
import {SendMessageDTO} from "@app/components/chat/application/dto/send.message";
import {inject, injectable} from "tsyringe";
import {Bind} from "@app/core/decorators/bind";
import {validate, ValidationError} from "class-validator";
import {Message} from "@app/components/chat/domain/model/Message";

@injectable()
export default class IoCommand {
    constructor (@inject("ChatServiceInterface") private chatService: ChatServiceInterface) {}

    @Bind
    public async send(msg, socket): Promise<void> {
        io.emit('message', msg);

        const sendMessageDTO: SendMessageDTO = new SendMessageDTO(msg.message, socket.decoded.data.id);
        const errors: ValidationError[] = await validate(sendMessageDTO); // errors is an array of validation errors

        if (errors.length > 0) {
            // return BAD REQUEST status code and errors array
            throw new Error('send_message_validation_error');
        } else {
            const message: Message = await this.chatService.send(sendMessageDTO);
        }
    }
}
