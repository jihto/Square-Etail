import { Exclude, Type } from "class-transformer";
import { IsArray, IsEmail,IsNotEmpty, IsNumber, IsOptional, IsString, MinLength, ValidateIf } from "class-validator";
 

export class SignInDto{  
    @IsNotEmpty()
    @IsEmail()
    username: string; 
    
    @IsNotEmpty() 
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' }) 
    password: string;    
    
    constructor(partial: Partial<SignInDto>){ 
        Object.assign(this, partial);
    } 
}