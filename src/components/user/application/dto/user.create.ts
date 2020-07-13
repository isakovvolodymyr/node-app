import { Length, IsEmail, MinLength, IsInt, Min, Max } from "class-validator";

export class CreateUserDTO {
    
    constructor(name: string, email: string, password: string, age: number) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.age = age;
    }

    @Length(8, 60)
    @MinLength(8, {
        message: "Title is too short"
    })
    private readonly name: string;

    @Length(10, 100)
    @IsEmail()
    private readonly email: string;

    @Length(8, 60)
    @MinLength(8, {
        message: "Password is too short"
    })
    private readonly password: string;

    @IsInt()
    @Min(1)
    @Max(200)
    private readonly age: number;

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getAge(): number {
        return this.age;
    }
}