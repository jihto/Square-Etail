import { Exclude, Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose"; 


export class NotificationDto{  
    @Type(() => String )
    _id: mongoose.Schema.Types.ObjectId;  

    @IsNotEmpty()
    @IsString()
    title: string;
    
    @IsString()
    content: string;
    
    @IsString()
    recipient: string ;

    @IsOptional()
    @IsString()
    link?: string;

    @IsOptional()
    @IsString()
    picture?: string;
 
    @IsDate()
    timeStamp: Date;

    @IsBoolean()
    isReading: boolean;

    constructor(partial: Partial<NotificationDto>){ 
        Object.assign(this, partial);
    } 
}