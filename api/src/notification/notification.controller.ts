import { Body, Controller, Get, HttpException, Param, Post, Put, Request } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDto } from './dtos/notification.dto';
import { NotificationType } from 'src/common/types/notification.enum';
import { SkipAuth } from 'src/common/decorators/auth.decorator';
import { CreateNotifcationDto } from './dtos/createNotification.dto';

@Controller('notification')
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService, 
    ){}

    @Get('user')
    userNotification(
        @Request() request: any,
    ): Promise<NotificationDto[]>{
        return this.notificationService.getUserNotifcation(request.user._id);
    }

    @SkipAuth()
    @Put('user/:id')
    userReadingNotification( 
        @Param("id") id: string,
    ): Promise<HttpException>{ 
        return this.notificationService.userReadingNotification(id);
    }
    
    @SkipAuth()
    @Post('create/:type')
    createUserNotification( 
        @Body() { recipient, link, picture }: CreateNotifcationDto, 
        @Param("type") type: NotificationType,
    ): Promise<HttpException>{  
        return this.notificationService.createNotifcation(recipient, type, picture, link)
    }
    
    
    @SkipAuth()
    @Get('seller/:id')
    sellerNotification(
        @Param('id') sellerId: any,
    ): Promise<NotificationDto[]>{
        return this.notificationService.getUserNotifcation(sellerId);
    }

}
