import React, { useState } from 'react'
import Modal from './Modal'
import { Button } from '../buttons/Button'
import useFilterodal from '../../hooks/zustands/useFilterModal'
import Each from '../../middlewares/Each'
import { TypesFilter } from '../../constants'
import Line from '../Line'
import RangeSlider from '../RangeSlider'
import FormMultipleField from '../inputs/FormMultipleField'

 
const FilterModal = () => {
    const { isOpen, onClose } = useFilterodal();
    const [types, setTypes] = useState<Array<number>>([]);
    const [sizes, setSizes] = useState<string[]>(["41","42"]);
    const action: React.ReactNode = <>
        <button className='font-medium'>Clear all</button>
        <Button className='bg-secondary text-white w-fit'>Apply</Button>
    </>
    const handleActive: Function = (index: number) => {
        if(types.includes(index)){
            setTypes(prev => prev.filter(el => el !== index));
        }else{
            setTypes(prev => [...prev, index])
        }
    }
    return (
        <Modal
            title="Filter Products"
            isOpen={isOpen}
            onClose={onClose}
            action={action}
        >
            <div className='py-5 grid gap-5'> 
                <p className='font-medium '>Price: </p>
                <div className='w-full h-fit'> 
                    <RangeSlider
                        range 
                        // value={[400, 600]}
                        min={0}
                        max={1000}
                        defaultValue={[100, 500]} 
                        marks={{ 300: 300, 500: 500, 900: 900 }}
                        tipFormatter={(value) => `${value}$`}
                    />
                </div>
                <Line/>
                <p className='font-medium '>Types: </p>
                <div className='flex-start gap-2'>
                    <Each 
                        of={TypesFilter}
                        render={(item: any, index: number) => 
                            <Button className={`${types.includes(index) ? "border-secondary bg-blue-50" : "bg-white"} w-24 h-24  border flex flex-col`} 
                                handleSubmit={() => handleActive(index)}
                            >
                                <item.icon size={30}/> 
                                <p className='text-end'>{item.text}</p>
                            </Button>}
                    />
                </div> 
                <Line/>
                <FormMultipleField list={sizes} onChangeList={setSizes} title='Size' placeholder='Write the size...'/> 
            </div>
        </Modal>
    )
}

export default FilterModal