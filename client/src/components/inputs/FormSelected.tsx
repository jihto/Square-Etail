import React, { memo, useEffect, useState } from 'react'
import { getDataFromLocalStorage } from '../../utils/checkLocalStorage';
import Box from '../Box';
import { IoClose } from 'react-icons/io5';
import { CategoryProps } from '../../types/Category.interface';

 

interface FormSelectedProps {
    title: string;
    values: CategoryProps[];
    error?: boolean; 
    onValues: React.Dispatch<React.SetStateAction<CategoryProps[]>>
}

const FormSelected: React.FC<FormSelectedProps> = ({
    title,
    error,
    values,
    onValues
}) => { 
    const [options, setOptions] = useState<CategoryProps[]>([]);
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId: number = Number(event.target.value); 
        const selectedOption: CategoryProps | undefined = options.find(i => i.id === selectedId);
        if(selectedOption){
            setOptions(prev => prev.filter(item => item.id !== selectedId));
            onValues([...values, selectedOption]);
        } 
    }
    const handleRemove = (itemRemove: CategoryProps) => {
        onValues(prev => prev.filter(item => item !== itemRemove));
        setOptions([...options, itemRemove]);
    }
    useEffect(() => {
        const data: CategoryProps[] = getDataFromLocalStorage("categories", []); 
        const result = data.filter((i: CategoryProps) => values.some(el => i.id !== el.id));
        setOptions(values.length > 0 ? result : data);
    }, [values])
    return ( 
        <div>
            <p className='text-gray-500 mb-2'>{title}:</p>
            <div  className={`${ error ? "border-red-400 border-[1px]" : "border-2"}  outline-none pl-2 pr-4 py-3 rounded-md relative text-gray-500`}>
                <div className='absolute bg-white w-1/2 flex gap-3 top-1'>
                    {
                        values
                            ? values.map(item => (
                                <Box className='w-fit rounded-full px-4' key={item.id}>
                                    {item.name}
                                    <IoClose className='text-red-400 cursor-pointer' onClick={() => handleRemove(item)}/>
                                </Box>
                            ))
                            : <p className='py-2'>Choose the categories</p>
                    }
                </div>
                <select onChange={handleChange} className='w-full outline-none'> 
                        <option>
                            Select the options below
                        </option>
                    {options.map((option: CategoryProps) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
        </div>
    </div>
    )
} 

export default memo(FormSelected);