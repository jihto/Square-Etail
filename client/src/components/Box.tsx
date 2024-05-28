interface BoxProps {
    children?: React.ReactNode;
    cols?: 0 | 1 | 2 ;
    className?: string;
    onClick?: (data?: any) => void;
}

const Box:React.FC<BoxProps> = ({
    className = "",
    children,
    cols = 0,
    onClick
}) =>{
    return (
        <div
            className={`
                bg-gray-100 p-2 rounded-2xl items-center gap-2
                ${cols === 0 ? "flex" : cols === 1 ? " flex flex-col" : "grid lg:grid-cols-2"}
                ${className}    
            `}
            onClick={onClick}
        > 
            {children} 
        </div>
    )
}

export default Box;