import React from 'react';

interface CheckboxProps {
    label: string;
    isChecked?: boolean;  
    onChange: (isChecked: boolean) => void; 
}

const Checkbox: React.FC<CheckboxProps> = ({ label, isChecked = false, onChange }) => {
    const [checked, setChecked] = React.useState(isChecked);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        onChange(event.target.checked);
    };

    return (
        <div className="flex items-center">
        <input
            type="checkbox"
            id={label}
            name={label}
            checked={checked}
            onChange={handleInputChange}
            className="h-5 w-5 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-opacity-60 border-gray-300 rounded"
        />
        <label htmlFor={label} className="ml-2 text-sm font-medium text-gray-700">
            {label}
        </label>
        </div>
    );
};

export default Checkbox;
