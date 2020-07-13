import {Length, MaxLength, IsNotEmpty} from "class-validator";
import {ObjectID} from "typeorm";

export class SendMessageDTO {
    
    constructor(message: string, userId: ObjectID) {
        this.message = message;
        this.userId = userId;
    }

    @Length(1, 360)
    @MaxLength(8, {
        message: "Message is too long"
    })
    private readonly message: string;

    @IsNotEmpty()
    private readonly userId: ObjectID;

    public getMessage(): string {
        return this.message;
    }

    public getUserId(): ObjectID {
        return this.userId;
    }
}