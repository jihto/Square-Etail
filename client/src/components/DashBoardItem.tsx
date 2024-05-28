

import React from 'react' 
import { DashBoardItemProps } from '../types/DashBoardItem.interface'
import { StatisticProps } from '../pages/admin/AdminHome';
import useStatisticModal from '../hooks/zustands/useStatisticModal';

interface  Props extends DashBoardItemProps { 
    count: StatisticProps; 
}

const DashBoardItem: React.FC<Props> = ({
    icon: Icon,
    statistic: IconStatistic,
    title, 
    count,
    description,
    total, 
    type, 
    start
}) => { 
    const { onOpen } = useStatisticModal();
    return (
        <div className='px-4 py-6 text-gray-600 grid gap-2 bg-white w-full rounded-xl shadow-lg '>
            <div className='flex justify-between'>
                <Icon size={40}/>
                <p className='text-3xl font-medium'>{count[total]}</p>
            </div>
                <p>{title}</p>
            <hr/>
            <div className='flex gap-10 justify-between items-center'>
                <p>Start from   {start}</p>
                { IconStatistic && <button onClick={() => onOpen(title, description, type)}><IconStatistic size={30}/></button>}
            </div>
        </div>
    )
}

export default DashBoardItem