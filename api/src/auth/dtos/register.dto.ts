import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, ValidateIf } from 'class-validator';
import { Sex } from 'src/common/types/sex.enum';

export class RegisterUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString() 
    city: string;

    @IsOptional()
    @IsString() 
    country: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' }) 
    password: string;

    @IsOptional()
    @IsString()
    gender: Sex;

    @IsOptional()
    @IsString()
    avatar?: string
}
 