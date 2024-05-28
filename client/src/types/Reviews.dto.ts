 
export interface ReviewDto{
    _id: string;
    content: string;
    user_create: UserReviews;
    timeStamp: string;
    picture?: string; 
}



interface UserReviews{
    name: string;
    avatar?: string;
}