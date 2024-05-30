import { CategoryProps } from "./Category.interface";

export interface ProductDetailsDto{
    id: string;
    name: string;
    description: string;
    quantity?: number;
    createdAt?: string;
    price: number;
    picture1: string;
    picture2?: string;
    picture3?: string;
    stock: number;
    categories?: CategoryProps[];
    created_by?: string;
    picture?: string;
    size: Array<string>;
    views?: number;
}
 
export interface ProductItem{
    id: string;
    name: string;
    description: string;
    quantity?: number;
    createdAt?: string;
    price: number;
    picture1: string;   
    created_by?: string; 
    size: string;
    views?: number;
}