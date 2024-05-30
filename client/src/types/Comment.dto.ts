 
export interface CommentDto{
    _id: string;
    content: string;
    user_create: UserComment;
    timeStamp: string;
    picture?: string; 
}



interface UserComment{
    name: string;
    avatar?: string;
}