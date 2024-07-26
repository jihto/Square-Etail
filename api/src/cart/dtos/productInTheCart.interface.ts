import { Exclude, Type } from "class-transformer";
import { ProductDto } from "./product.interface";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import mongoose from "mongoose";



export class ProductInTheCartDto{  
    @Type(() => String)
    _id?: mongoose.Schema.Types.ObjectId; 

    @Type(() => Object)
    product: {
        _id: string;
        size: string 
    };
    
    @IsNumber()
    @IsNotEmpty()
    count: number;   
}
