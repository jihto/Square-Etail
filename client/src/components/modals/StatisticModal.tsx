


import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import BarChart from '../charts/BarChart'
import { IoMdArrowDown } from 'react-icons/io'
import useStatisticModal from '../../hooks/zustands/useStatisticModal'
import { apiAdminRequest } from '../../redux/api/djangoAPI' 
import LineChart from '../charts/LineChart'
import { IoArrowUp, IoEgg } from 'react-icons/io5'



const StatisticModal:React.FC = () => {
    const { isOpen, onClose, type, description } = useStatisticModal(); 
    const [data, setData] = React.useState<number[]>([]);
    const [ percent, setPercent ] = useState<number>(0); 
    const currentMonth:number = new Date().getMonth();  
    useEffect(() => {
        const getStatistic = async() => {
            try {
                const response = await apiAdminRequest({
                    url: `seller/statistic/${type}`,
                    data: {}
                }); 
                if(response?.data && Array.isArray(response?.data?.data)){ 
                    const result = response.data.data;
                    if(result){    
                        setData(result);
                        setPercent((((result[currentMonth] - result[currentMonth - 1]) / (result[currentMonth] + result[currentMonth - 1]))) * 100) ;
                    }   
                }
            } catch (error) { 
            }
        }
        getStatistic()  
    },[isOpen]);
    return (
        <Modal 
            isOpen={isOpen}
            onClose={onClose}
            title="Statistic "
            className="w-[95%] md:w-2/3 xl:w-1/2"
        >    
            { type === "product" ? <BarChart values={data} type={type}/> : <LineChart values={data} type={type}/> }  
            <p className='text-center my-5 text-lg font-medium text-gray-500'>{description}</p>
            {type === "product"
                ? null
                : <div className={`rounded-lg shadow-md ${percent > 0 ? "bg-green-400" : percent === 0 ? "bg-secondary" : "bg-red-400"}  text-white p-4 flex-between gap-5`}>
                    <div>
                        <p className='text-lg font-medium'>10,000</p>    
                        <p>Solds this year</p>
                    </div>
                    <p className='flex'>{percent}% {percent > 0 ? <IoArrowUp/> : percent === 0 ? <IoEgg/> : <IoMdArrowDown />}</p>
                </div>
            }
        </Modal>
    )
}

export default StatisticModal