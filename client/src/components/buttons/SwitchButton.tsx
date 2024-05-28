import React  from 'react'
import IconButton from './IconButton' 
import { IconType } from 'react-icons'

interface SwitchButtonProps{
    icon: IconType;
    title: string;
    icon2: IconType;
    title2: string;
    state: boolean;
    onState: React.Dispatch<React.SetStateAction<boolean>>
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
    icon: Icon,
    icon2: Icon2,
    title,
    title2,
    state,
    onState,
}) => { 
    return (
        <div className='grid grid-flow-col border bg-gray-200 w-fit h-fit rounded-full font-medium'>
            <IconButton hanldeClick={() => onState(true)} icon={Icon} text={title} className={`${state ? "bg-secondary text-white" : "bg-gray-200"} border-none h-fit p-0`}/>
            <IconButton hanldeClick={() => onState(false)} icon={Icon2} text={title2} className={`${state ? "bg-gray-200" : "bg-secondary text-white"} border-none h-fit p-0`}/>
        </div>
    )
} 
export default SwitchButton