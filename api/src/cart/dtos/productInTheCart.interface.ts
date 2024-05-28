import { Exclude, Type } from "class-transformer";
import { ProductDto } from "./product.interface";
import { IsNotEmpty, IsNumber } from "class-validator";
import mongoose from "mongoose";


export class ProductInTheCartDto{  
    @Type(() => String)
    _id: mongoose.Schema.Types.ObjectId; 


    @Type(() => Object)
    product: string | ProductDto;
    
    @IsNumber()
    @IsNotEmpty()
    count: number;  
}
