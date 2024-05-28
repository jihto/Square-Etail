import mongoose, { Document, Schema, Types } from 'mongoose'; 

import { Sex } from 'src/common/types/sex.enum'; 

const UserSchema = new Schema({
    name: { type: String, required: true, unique: true }, 
    city: { type: String,default: "" },
    address: { type: String, default: "" }, 
    country: { type: String,  default: ""},
    email: { type: String, required: true },
    phone: { type: Number, default: 0 },
    avatar: { type: String, require: false}, 
    gender: { type: String, enum: [Sex.MALE, Sex.FEMALE], default: Sex.MALE }, 
    cartId: { type: Types.ObjectId, ref: 'Cart' },
    password: { type: String, required: true }, 
    isVerify: { type: Boolean, default:false},
});

export interface IUser extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    city: string;
    country: string;
    phone: number;
    address: string;
    avatar: string;
    gender: Sex;  
    password: string;  
    isVerify: boolean;
    cartId: mongoose.Schema.Types.ObjectId; 
}

export const User = { name: 'User', schema: UserSchema };