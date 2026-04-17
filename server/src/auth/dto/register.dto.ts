import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

 

export class RegisterDto {
    @IsEmail({}, { message: 'Incorrect email format' })
    @IsNotEmpty({message: "Email is required"})
    email!: string

    @IsNotEmpty({message: "Password is required"})
    @IsString({message: "Password must be a string"})
    @MinLength(8, {message: "Password must be at least 8 characters long"})
    password!: string
}