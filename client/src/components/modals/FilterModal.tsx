import React, { useCallback, useEffect, useState } from 'react'
import Modal from './Modal'
import { Button } from '../buttons/Button'
import useFilterodal from '../../hooks/zustands/useFilterModal'  
import { IconCategoriesFilter } from '../../constants'
import Line from '../Line'
import RangeSlider from '../RangeSlider';
import FormMultipleField from '../inputs/FormMultipleField';
import { getDataFromLocalStorage } from '../../utils/checkLocalStorage';
import { CategoryProps } from '../../types/Category.interface'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../redux/store'
import { RootProductAction } from '../../redux/reducers/productReducer'
import { getProducts } from '../../redux/actions/productActions'

interface DataFormValues{
    price: number[] | number, 
    categories: CategoryProps[];
}


const FilterModal = () => {
    const initailValues ={
        price: [100, 150], 
        categories: [],
    }
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootProductAction>>(); 
    const { isOpen, onClose } = useFilterodal();
    const [formData, setFormData]= useState<DataFormValues>(initailValues); 
    const [size, setSize] = useState<string[]>([]);
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const handleActive: Function = (item: CategoryProps) => {
        formData.categories.includes(item)
            ? setFormData(prev => ({
                ...prev,
                categories: prev.categories.filter(el => el.id !== item.id)
            }))
            : setFormData(prev => ({
                ...prev,
                categories: [...prev.categories, item]
            })) 
    } 
    const handleFilter = () =>{ 
        dispatch(getProducts({
            ...(formData.categories.length > 0 && { categories: JSON.stringify(formData.categories.map(i => i.id))}),
            ...(formData.price && { price: JSON.stringify(formData.price)}),
            ...(size.length > 0 && { size: JSON.stringify(size)}),
        }));
        handleClear();
        onClose();
    }
    const handleChangeRangePrice = useCallback((newValue: number[] | number) => {
        setFormData(prev => ({
            ...prev,
            price: newValue
        }))
    }, [])
    const handleClear = () =>  setFormData(initailValues);
    useEffect(()=>{
        const data = getDataFromLocalStorage("categories", []);
        setCategories(data);
    }, []);
    return (
        <Modal
            title="Filter Products"
            isOpen={isOpen}
            onClose={onClose}  
        >
            <div className='pt-5 grid gap-5'> 
                <p className='text-gray-500'>Price: </p>
                <div className='w-full h-fit'> 
                    <RangeSlider
                        range  
                        min={0}
                        max={1000}
                        defaultValue={formData.price} 
                        marks={{ 200: 200, 400: 400, 600: 600, 800: 800 }}
                        tipFormatter={(value) => `${value}`}
                        onChange={handleChangeRangePrice}
                    />
                </div>
                <Line/>
                <p className='text-gray-500'>Categories: </p>
                <div className='flex-start gap-2'> 
                    {categories.map((item: CategoryProps, index: number) => {
                        const matchingIcon = IconCategoriesFilter.find( (icon: any) => icon.name.toLowerCase() === item.name.toLowerCase()); 
                        return (
                            <Button key={index} className={`${formData.categories.includes(item) ? "border-secondary bg-blue-50" : "bg-white"} w-24 h-24  border flex flex-col`} 
                                handleSubmit={() => handleActive(item)}
                            > 
                                {matchingIcon ? React.createElement(matchingIcon.icon, { style: { fontSize: `30px` } }) : null}
                                <span className='text-end'>{item.name}</span> 
                            </Button>
                        );
                    })} 
                </div> 
                <Line/>
                <FormMultipleField list={size} onChangeList={setSize} title='Size' placeholder='Write the size...'/> 
                <hr/>
                <div className='flex-between'>
                    <button className='font-medium' onClick={handleClear}>Clear all</button>
                    <Button className='bg-secondary text-white w-fit' handleSubmit={handleFilter} >Apply</Button>
                </div>
            </div>
        </Modal>
    )
}

export default FilterModal