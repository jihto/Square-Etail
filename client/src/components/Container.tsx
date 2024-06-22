

interface ContainerProps{
    children: React.ReactNode;
    className?: string;
}

const Container: React.FC<ContainerProps> = ({ 
    children,  
    className="",
}) => {
    return (
        <div className={`
            grid gap-3
            max-w-[2520px]   
            mb-auto
            w-full
            xl:px-12
            lg:px-10
            md:px-8
            sm:px-6
            px-2  
            py-5
            ${className}
        `}>
            {children}
        </div>
    )
}

export default Container;