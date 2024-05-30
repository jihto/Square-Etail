import React from 'react'
import { IconType } from 'react-icons';

interface IconButtonProp {
    icon: IconType;
    className?: string;
    hanldeClick: () => void;
    size?: number;
    text?: string;
    disabled?: boolean;
}

const IconButton: React.FC<IconButtonProp> = ({ 
    icon: Icon, 
    className = "", 
    size = 24,
    hanldeClick,
    text = "",
    disabled = false, 
}) => {
    return (
        <button
            disabled={disabled} 
            className={`
                ${className ? className : "bg-gray-200"} text-sm rounded-full w-fit shadow-sm p-2 border-[1px] flex-center
                ${ disabled ? "opacity-50" : "" }
            `}
            onClick={hanldeClick}
        >
            <p className='hidden md:block'>{text} </p>
            <Icon size={size}/>
        </button>
    )
}

export default IconButton;
