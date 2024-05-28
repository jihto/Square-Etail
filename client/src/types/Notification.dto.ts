export interface NotificationDto{
    _id: string;
    title: string;
    content: string;
    timeStamp: string;
    isReading: boolean;
}


export function isNotificationDto(value: any): value is NotificationDto {
    return (
        typeof value === 'object' &&
        value !== null &&
        'title' in value &&
        typeof value.title === 'string' &&
        'content' in value &&
        typeof value.content === 'string' &&
        'timeStamp' in value &&
        typeof value.timeStamp === 'string' &&
        'isReading' in value &&
        typeof value.isReading === 'boolean'
    );
}
