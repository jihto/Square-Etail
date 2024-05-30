import React from 'react'
import { IconType } from 'react-icons';

interface TextIconFieldProps{
    label: string;
    icon: IconType 
    type?: "text" | "password" | "email";
    active?: boolean;
    name: string
    register: any; 
}

const TextIconField: React.FC<TextIconFieldProps> = ({
    label,
    name, 
    icon: Icon, 
    type = "text",
    active = false,
    register,
}) => {
    return (
        <div className='grid grid-cols-[6%,23%,71%] text-gray-500 items-center justify-start gap-2 font-medium w-full'>
            <Icon size={24}/>
            <label>{label}</label> 
            <input 
                type={type}
                name={name} 
                {...register}  
                className={`
                    ${ active ? "focus:ring-[#6469ff] focus:border-[#6469ff] border-b-2" : "border-b-2 border-white pointer-events-none" } 
                    p-2 pb-1 outline-none w-full
                `}
            />
        </div>
    )
}

export default TextIconField