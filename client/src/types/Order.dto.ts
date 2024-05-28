import { ItemInTheCartDto } from "./Cart.dto"; 

export interface OrderDto {
    id: string;
    customerName: string;
    paymentId: string;
    address: string; 
    phone: string;
    status?: string;
    isConfirm?: boolean;
    userId?: number;
    createdAt: string; 
    products: Array<ItemInTheCartDto>;
    totalPrice: number;
}