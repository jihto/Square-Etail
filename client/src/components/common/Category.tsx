import { IconType } from "react-icons";

 
interface CategoryProps{
    name: string;
    icon: IconType;
    isHidden?:boolean;
    isActive: boolean;
    onChangeState: VoidFunction;
}


const Category: React.FC<CategoryProps> = ({
    name, 
    isHidden,
    icon: Icon,
    isActive,
    onChangeState
}) => {   
    return (
        <button onClick={onChangeState} className={` ${isActive ? "text-secondary font-medium drop-shadow-lg" : "text-gray-600 bg-white"} w-16 md:w-20 lg:w-28 ${ isHidden ? "h-12" : "h-16" }  p-2 rounded-lg grid-center`}>
            <Icon size={26}/>
            <p className={`text-sm  ${isHidden ? "hidden" : "hidden md:block "}`}> {name} </p>
        </button>
    )
}

export default Category;