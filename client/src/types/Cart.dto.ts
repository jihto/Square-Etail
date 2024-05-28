import { ProductDetailsDto } from "./ProductDetails.interface";

export interface CartDto {
    quantity: number;
    totalPrice: number;
    products: ItemInTheCartDto[];
    _id: string;
}


export interface ItemInTheCartDto{
    product: ProductDetailsDto;
    count: number;
}