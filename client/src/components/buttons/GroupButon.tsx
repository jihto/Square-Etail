import React from 'react';
import { Button } from './Button'; 

interface GroupButtonProps {
    label: string |  React.ReactNode;
    labelSecondary: string | React.ReactNode;
    action: () => void;
    secondAction: () => void; 
    primaryButtonClass?: string; 
    secondaryButtonClass?: string;
    disable?: boolean;
}

const GroupButton: React.FC<GroupButtonProps> = ({
    label,
    labelSecondary,
    action,
    secondAction,
    primaryButtonClass = '', 
    secondaryButtonClass = '',   
    disable 
}) => {
    return (
        <div className="flex justify-between m-1 gap-5">
            <Button
                disabled = {disable}
                handleSubmit={secondAction}
                className={`${secondaryButtonClass ? secondaryButtonClass : "bg-gray-400 rounded-full text-white"} font-medium flex justify-center items-center gap-1 flex-1 px-8`}
            >
                {labelSecondary}
            </Button>
            <Button
                handleSubmit={action}
                disabled = {disable}
                type='submit'
                className={`${primaryButtonClass ? primaryButtonClass : "bg-secondary rounded-full text-white"} font-medium flex justify-center items-center gap-1 flex-1 px-8 `}
            >
                {label}
            </Button>
        </div>
    );
};

export default GroupButton;
