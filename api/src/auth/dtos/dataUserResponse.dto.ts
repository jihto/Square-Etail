import { Exclude, Type } from "class-transformer";
import { IsArray, IsEmail,IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import mongoose, { Types } from "mongoose";
import { Sex } from "src/common/types/sex.enum";

export class DataUserResponseDto{
    @Type(() => String)
    _id: mongoose.Schema.Types.ObjectId;  
    
    @IsOptional()
    @IsString()
    city: string;

    @IsOptional()
    @IsString()
    country: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional() 
    phone: number | string;

    @IsString()
    @IsNotEmpty()
    name: string;
 
    @IsOptional()
    @IsString()
    @Type(() => String)
    gender: Sex;

    @IsOptional()
    @IsString()
    address: string;

    @Type(() => String)
    cartId: mongoose.Schema.Types.ObjectId;
    
    @Exclude() 
    password?: string;
 
    @IsString()
    @IsNotEmpty()
    token?: string;

    @Exclude()
    @IsString()
    @IsNotEmpty()
    isVerify: boolean; 
    
    constructor(partial: Partial<DataUserResponseDto>){ 
        Object.assign(this, partial);
    } 
}