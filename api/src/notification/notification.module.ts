import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification } from 'src/schemas/notification.model';
import { NotificationGateway } from './notification.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([ Notification ]), 
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway]
})
export class NotificationModule {}
