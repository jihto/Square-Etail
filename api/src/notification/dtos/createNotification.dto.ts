import { PickType } from "@nestjs/mapped-types";
import { NotificationDto } from "./notification.dto";


export class CreateNotifcationDto extends PickType(NotificationDto, ['recipient', 'link', 'picture']){}; 