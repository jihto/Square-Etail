import React from 'react'
import { CiShoppingCart } from 'react-icons/ci'
import { Button } from './buttons/Button'
import { IoIosRocket, IoMdRefreshCircle } from 'react-icons/io'
import { IconType } from 'react-icons'

interface EmptyProps{
  icon?: IconType;
  title?: string;
  size?: number;
  isButton?: boolean;
}

const Empty:React.FC<EmptyProps> = ({
  icon: Icon = CiShoppingCart, 
  isButton, 
  size = 150, 
  title = "Can't find any products" 
}) => {
  return (
    <div className='grid-center content-center w-full gap-3 h-full mt-10'>
        <Icon className='text-gray-400' size={size} />
        <p className='text-2xl text-gray-400'>{title}</p>
        {
          isButton 
            ? <>
              <Button handleSubmit={()=>{}} className='text-red-400 border-2 border-red-300 bg-gray-50'><IoIosRocket />Lauch product</Button>
              <Button handleSubmit={()=>{}} className='text-red-400 border-2 border-red-300 bg-gray-50'><IoMdRefreshCircle  />Refresh product</Button>
            </>
            :null
        }
    </div>
  )
}

export default Empty