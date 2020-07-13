import { Length, IsEmail, MinLength } from "class-validator";

export class UserLoginDTO {
    
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    @Length(10, 100)
    @IsEmail()
    email: string;

    @Length(8, 60)
    @MinLength(8, {
        message: "Password is too short"
    })
    password: string;
}