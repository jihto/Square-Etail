import React from 'react'

interface HeadingProps{
    children?: React.ReactNode;
    title: string | React.ReactNode;
    className?: string;
}

const Heading: React.FC<HeadingProps> = ({
    children = "",
    title,
    className
}) => {
    return ( 
        <div className='h-fit'>
            <div className='text-base font-medium flex items-center gap-2 mb-2'> {title} </div>
            <div className={`leading-7 `}>
                <div className={`${className}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Heading