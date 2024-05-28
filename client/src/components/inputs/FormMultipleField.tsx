import React, { KeyboardEvent, useState } from 'react'
import Each from '../../middlewares/Each';
import { IoClose } from 'react-icons/io5';

interface FormMultipleFieldProps{
    title: string;
    placeholder: string;
    list: string[];
    onChangeList: React.Dispatch<React.SetStateAction<string[]>>;
}


const FormMultipleField: React.FC<FormMultipleFieldProps> = ({
    title,
    placeholder,
    list, 
    onChangeList
}) => { 
    const [inputValue, setInputValue] = useState<string>('');
    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue !== "") {
            list.push(inputValue);
            onChangeList([...list]);
            setInputValue(''); 
        }
    };

    return (
        <div >
            <p className='text-base text-gray-500 mb-2'>{title}</p>
            <div className='border border-gray-300 rounded-lg p-2 flex flex-wrap gap-2'>
                <Each 
                    of={list}
                    render={(item: string) => 
                        <div className='bg-gray-100 w-fit px-2 py-1 text-gray-500 rounded-lg flex items-center gap-2'>
                            <p>{item}</p>
                            <p className='text-red-400' onClick={() => onChangeList(list.filter(el => el !== item))}><IoClose size={16}/></p>
                        </div>
                    }
                />
                <input 
                    placeholder={placeholder}
                    className='rounded-lg ps-3 w-fit outline-none'
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}    
                />
            </div>
        </div>
    )
}

export default FormMultipleField