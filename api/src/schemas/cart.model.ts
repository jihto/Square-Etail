import mongoose, { Document, Schema, Types } from 'mongoose'; 

const CartSchema = new Schema({ 
    quantity: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, default: 0 }, 
    products: [{
        product: { type: String},
        count: { type: Number, default: 1 }
    }],
});

export interface ICart extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    quantity: number;
    totalPrice: number
    products: Array<{ product: string, count: number, _id: mongoose.Schema.Types.ObjectId }>; 
}

export const Cart = { name: 'Cart', schema: CartSchema };