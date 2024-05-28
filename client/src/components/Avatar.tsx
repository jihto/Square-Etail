import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

interface AvatarProps{
    imgUrl?: string;
    size?: number;
}

const Avatar: React.FC<AvatarProps> = ({
    size = 10 ,
    imgUrl
}) => {
    const { user } = useSelector((state: RootState) => state.auth);
    return (
        <img 
            className={`w-${size} h-${size} rounded-full`} 
            src={imgUrl || user?.avatar || "avatar.jpg"}
            alt='avatar'
        />
    )
}

export default Avatar