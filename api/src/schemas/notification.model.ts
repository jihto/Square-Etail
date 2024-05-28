import mongoose, { Document, Schema, Types } from 'mongoose'; 

const NotificationSchema = new Schema({
    title: { type: String, required: true },
    picture: { type: String, required: false }, 
    content: { type: String, require: true },  
    link: { type: String, require: false, default: "" }, 
    recipient: { type: String, require:true }, 
    isReading: { type: Boolean, default:false  },
    timeStamp: { type: Date, default: Date.now() },
});

export interface INotification extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    title: string;
    picture: string;
    content: string;
    isReading: boolean;
    link: string;
    recipient: string; 
    timeStamp: Date;
}

export const Notification = { name: 'Notification', schema: NotificationSchema };