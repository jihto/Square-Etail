import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";

export class DataUserCommentDto{
    @Type(() => String)
    _id: mongoose.Schema.Types.ObjectId;  

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString() 
    avatar: string;

    
    constructor(partial: Partial<DataUserCommentDto>){ 
        Object.assign(this, partial);
    } 
}