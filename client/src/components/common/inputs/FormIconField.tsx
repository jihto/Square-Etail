import React from 'react'
import { IconType } from 'react-icons';

interface FormIconFieldProps{
    label: string;
    icon: IconType 
    type?: "text" | "password" | "email" | "number";
    active?: boolean;
    name: string
    register: any; 
}

const FormIconField: React.FC<FormIconFieldProps> = ({
    label,
    name, 
    icon: Icon, 
    type = "text",
    active,
    register,
}) => {
    return (
        <div className='grid grid-cols-[6%,23%,71%] text-gray-500 items-center justify-start gap-2 font-medium w-full'>
            <Icon size={24}/>
            <label>{label}</label> 
            <input 
                id={name}
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

export default FormIconField