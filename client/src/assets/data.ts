import { ColourOption } from "../constants";
import { UserDto } from "../types/User.interface";

export const userData: UserDto = {
    _id: '6489a3d4e0c3b2f7a1b2c3d4',
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main Street, Anytown USA',
    phone: 1234567890,
    country: 'United States',
    city: 'New York',
    gender: 'male',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    avatar: 'https://example.com/avatar.jpg',
    cartId: '7d8a2b3c4e5f6g7h8i9j0k1l2m3n',
    __v: '0'
};


export const colourOptions: ColourOption[] = [
    { label: 'ocean', value: 'Ocean'},
    { label: 'blue', value: 'Blue', color: '#0052CC', isDisabled: true },
    { label: 'purple', value: 'Purple', color: '#5243AA' },
    { label: 'red', value: 'Red', color: '#FF5630', isFixed: true },
    { label: 'orange', value: 'Orange', color: '#FF8B00' },
    { label: 'yellow', value: 'Yellow', color: '#FFC400' },
    { label: 'green', value: 'Green', color: '#36B37E' },
    { label: 'forest', value: 'Forest', color: '#00875A' },
    { label: 'slate', value: 'Slate', color: '#253858' },
    { label: 'silver', value: 'Silver', color: '#666666' },
];
