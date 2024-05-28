import moment from "moment";
import Each from "../middlewares/Each";
import { FaCheck } from "react-icons/fa";

interface  ProcessProps {
    step?: number;
    title: string[];
    date?: string[];
    size?: 'small' | 'large'; 
    state?: number;
}
const Proccess: React.FC<ProcessProps> = ({step = 3, state = 1, title, date, size = 'large'}) => { 
    const numberStep: number[] = new Array(step).fill(null).map((_, index) => index + 1);  
    return ( 
        <div className={`
            flex w-full justify-between items-center relative
            ${size === 'large' ? "text-base" : 'text-sm'}
        `}>
            <Each 
                of={numberStep}
                render={(item: number, index:number) => 
                    <div className='z-10 grid-center justify-items-center'>
                        <p className={` 
                            ${ size === 'large' ? "w-8 h-8" : "w-5 h-5"} 
                            rounded-full flex justify-center items-center text-white 
                            ${item === state ? "bg-green-400" : "bg-secondary" }
                        `}>
                            { item === state ? <FaCheck/> :  item }
                        </p>
                        <p className={`${size === "large" ? "text-sm uppercase" :  ""} `}>{title[item - 1]}</p>
                        <p className='text-gray-400 text-sm'> {date ? moment(date[index]).format("kk:mm-DD/MM/YYYY") : ""}</p>
                    </div>
                }
            />
            <div className={`w-full h-1 ${size === "large" ? "top-[0.85rem]" : "top-[0.5rem]" } rounded-lg absolute z-0 bg-gray-200`}></div>
        </div>
    )
}

export default Proccess;