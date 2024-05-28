import mongoose from "mongoose"; 
export interface RequestUser extends Request {
    user: DataRequestUser;
}


interface DataRequestUser { 
    _id: string;
    email: string;
    name: string;
    cartId: string;
    iat: number;
    exp: number;
}