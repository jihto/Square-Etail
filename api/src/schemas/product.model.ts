import * as mongoose from 'mongoose';    
import { IUser } from './user.model';

const ProductSchema = new mongoose.Schema({ 
    name: { type: String, require: true, unique: true},
    description: { type: String, require: true}, 
    price: { type: Number, require: true },
    categories: [{ type:String, require: false, default: [] }],
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" }, 
    picture: { type: String, require: true }, 
    pictureHash: { type: String, require: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    isDeleted: {type: Boolean, default: false},
    buyer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})
export interface IProduct extends Document{ 
    _id:string;
    name: string;
    description: string;
    price: number;
    categories: string[]; 
    picture: string;
    pictureHash: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean; 
    buyer: IUser['_id'][];
}

export const Product = { name:'Product', schema: ProductSchema };