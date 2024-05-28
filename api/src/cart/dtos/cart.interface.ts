import { Exclude, Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";
import { ProductDto } from "./product.interface";
import { ProductInTheCartDto } from "./productInTheCart.interface";
 

export class CartDto{
    @IsOptional()
    @Type(() => String)
    _id: mongoose.Schema.Types.ObjectId;  

    @IsNumber()
    quantity: number

    @IsNumber()
    @IsNotEmpty()
    totalPrice: number;

    @IsArray()
    @Type(() => Object)
    products: Array<ProductInTheCartDto> 

    @IsOptional()
    @IsNumber()
    __v: number;

    constructor(partial: Partial<CartDto>){ 
        Object.assign(this, partial);
    } 
}