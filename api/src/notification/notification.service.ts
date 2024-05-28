import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { INotification } from 'src/schemas/notification.model';
import { NotificationDto } from './dtos/notification.dto';
import { NotificationType } from 'src/common/types/notification.enum';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService { 
    constructor(  
        @InjectModel('Notification') private readonly NotificationModel:Model<INotification>, 
        private readonly notificationGateway: NotificationGateway
    ) {} 

    private getNotificationContent: (type: NotificationType) => {
        title: string;
        content: string;
    } = (type: NotificationType) => {
        switch(type.toUpperCase()){
            case NotificationType.Order:
                return {
                    title: "New Order Received",
                    content: "You have received a new order. Please check your dashboard for more details."
                }
            case NotificationType.Confirm:
                return {
                    title: "Order Confirmation",
                    content: "Your order has been confirmed. Thank you for shopping with us!"
                }
            case NotificationType.Cancel:
                return {
                    title: "Order Cancellation",
                    content: "Your order has been cancelled. If you have any questions, please contact customer support."
                }
            case NotificationType.Success:
                return {
                    title: "Order Successful",
                    content: "The Order has been completed successfully."
                }
            default: 
                return {
                    title: "",
                    content: ""
                }
        }
    };
    
    private getNotification = async(recipient: string): Promise<NotificationDto[] | []> => {
        try { 
            const data = await this.NotificationModel.find({ recipient }).lean().sort({ isReading: 1, timeStamp: 1}).exec();;
            return data.map(item => new NotificationDto(item));
        } catch (error) {
            console.log(error.message);
            return [];
        }
    }

    getUserNotifcation = async(
        userId: string,
    ): Promise<NotificationDto[]> => {
        try {
            const data = await this.getNotification(userId);
            return data;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_GATEWAY)
        }
    }

    userReadingNotification = async(_id: string): Promise<HttpException> => {
        try {  
            const result = await this.NotificationModel.findByIdAndUpdate({ _id }, {$set: { isReading: true }});
            return new HttpException("Update notification success", HttpStatus.OK)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
        }
    }

    createNotifcation = async(
        recipient: string | mongoose.Schema.Types.ObjectId, 
        type: NotificationType,
        picture: string,
        link: string,
    ): Promise<HttpException> => {
        try {
            console.log({ recipient, type });
            const { title, content } = await this.getNotificationContent(type);
            const formData =  {
                recipient,
                title,
                content,
                ...(link && { link }),
                ...(picture && { picture } )
            }
            // const imgUrl: string =  "http://localhost:3000/" + picture;
            const result = new this.NotificationModel(formData);
            console.log({ result })
            const savedNotification = await result.save();  
            
            this.notificationGateway.sendNotification(recipient.toString(), savedNotification); 
            return new HttpException("Create notification success", HttpStatus.OK)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
        }
    } 

}
