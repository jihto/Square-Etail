import mongoose, { Document, Schema, Types } from 'mongoose'; 
import { ProductInTheCartDto } from 'src/cart/dtos/productInTheCart.interface';

const CartSchema = new Schema({ 
    quantity: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, default: 0 }, 
    products: [{
        product: { _id: { type: String }, size: { type: String  } },
        count: { type: Number, default: 1 }
    }],
});
 

export interface ICart extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    quantity: number;
    totalPrice: number
    products: Array<{ 
        product: { _id: string, size: string},
        count: number
    }>; 
}

export const Cart = { name: 'Cart', schema: CartSchema };