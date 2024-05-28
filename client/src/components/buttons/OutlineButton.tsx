import React from 'react'

interface OutlineButtonProps{
    children: string | React.ReactNode;
    className?: string;
    isActive?: boolean;
    type?: "button"| "submit";
    handleSubmit:  () => void;

}


export const OutlineButton: React.FC<OutlineButtonProps> = ({ 
    children,
    isActive = false,
    className ,
    type = "button",
    handleSubmit,
    }) => {
    return (
        <button 
            type={type}
            onClick={handleSubmit}
            className={`${className} ${isActive && "border-b-2"} flex justify-center items-center gap-4 shadow-lg py-2 hover:opacity-65 rounded-lg w-full`}
        >
            {children}
        </button>
    )
}
