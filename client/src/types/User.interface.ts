export interface UserDto {
    _id: string;
    name: string;
    email: string;
    address: string;
    phone: number;
    country: string;
    city: string;
    gender: string;   
    token: string; 
    avatar: string;
    cartId: string;  
    __v: string;
}

export type UserDtoKeys = keyof UserDto;