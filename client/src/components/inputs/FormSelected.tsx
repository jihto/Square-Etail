import React, { useEffect, useState } from 'react'
import { getDataFromLocalStorage } from '../../utils/checkLocalStorage';
import Box from '../Box';
import { IoClose } from 'react-icons/io5';
import { CategoryProps } from '../../types/Category.interface';

 

interface FormSelectedProps {
    values: CategoryProps[];
    onValues: React.Dispatch<React.SetStateAction<CategoryProps[]>>
}

const FormSelected: React.FC<FormSelectedProps> = ({
    values,
    onValues
}) => {
    // const [selectedValue, setSelectedValue] = useState<CategoryProps[]>([]);
    console.log(values)
    const [options, setOptions] = useState<CategoryProps[]>([]);
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId: number = Number(event.target.value);
        console.log(selectedId)
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
        const data = getDataFromLocalStorage("categories", []);
        setOptions(data);
    }, [])
    return ( 
        <div  className='border-2 outline-none pl-2 pr-4 py-3 rounded-md relative text-gray-500'>
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
    )
} 

export default FormSelected;