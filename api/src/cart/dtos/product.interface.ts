import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, MaxLength } from "class-validator";

export class ProductDto{
    @Type(() => String) 
    id: string;

    @IsString()
    @MaxLength(50, { message: 'Name product must be at least 50 characters long' }) 
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    quantity: number;


    @IsString()
    createdAt: string;

    @IsNumber()
    price: number;

    @IsString()
    picture: string;
    
    @IsString()
    stock: number;

    @IsArray()
    categories: Array<string>;


    @IsString()
    created_by: string;
    
    constructor(partial: Partial<ProductDto>){ 
        Object.assign(this, partial);
    } 
}