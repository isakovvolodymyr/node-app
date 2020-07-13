import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    ObjectIdColumn,
    ObjectID
} from "typeorm";
import {Length, IsEmail, MinLength} from "class-validator";

@Entity()
export class User {
    @ObjectIdColumn()
    private id: ObjectID;

    @Column({
        length: 60
    })
    @Length(8, 60)
    private name: string;

    @Column({
        length: 100,
        unique: true
    })
    @Length(10, 100)
    @IsEmail()
    @Index({unique: true})
    private email: string;

    @Column({
        length: 60
    })
    @Length(8, 60)
    @MinLength(8, {
        message: "Password is too short"
    })
    private password: string;

    @Column()
    private age: number;

    @CreateDateColumn({ type: 'timestamp' })
    private createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true  })
    private updatedAt?: Date;

    public create(name: string, email: string, password: string, age: number): User
    {
        this.name = name;
        this.email = email;
        this.password = password;
        this.age = age;

        return this;
    }

    public getPassword(): string {
        return this.password;
    }
}
