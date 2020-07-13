import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectID,
    ObjectIdColumn
} from "typeorm";
import {Length, MaxLength} from "class-validator";

@Entity()
export class Message {
    @ObjectIdColumn()
    private id: ObjectID;

    @Column({
        length: 60
    })
    @Length(1, 360)
    @MaxLength(8, {
        message: "Message is too long"
    })
    private message: string;

    @ObjectIdColumn()
    userId: ObjectID;

    @CreateDateColumn({ type: 'timestamp' })
    private createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true  })
    private updatedAt?: Date;

    public create(message: string, userId: ObjectID): Message
    {
        this.message = message;
        this.userId = userId;

        return this;
    }
}
