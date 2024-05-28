import React from 'react'

interface ButtonProps{
  children: string | React.ReactNode;
  className?: string;
  type?: "button"| "submit";
  handleSubmit?:  (data?: any) => void;
  disabled?: boolean;
  rounded?: "xl" | "sm" | "md" | "lg" | "full";
}


export const Button: React.FC<ButtonProps> = ({ 
  children,
  className ,
  type = "button",
  handleSubmit,
  disabled,
  rounded = "xl"
}) => {
  return (
    <button
      disabled={disabled} 
      type={type}
      onClick={handleSubmit}
      className={`
        flex justify-center items-center gap-2 px-4  py-2 hover:opacity-95 
        rounded-${rounded}
        ${className || 'text-white bg-secondary'}  
        ${disabled && "opacity-60 pointer-events-none"}
      `}
    >
        {children}
    </button>
  )
}
