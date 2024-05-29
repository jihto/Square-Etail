import React from 'react'
import QRCode from 'react-qr-code'
import useOrderModal from '../../hooks/zustands/useOrderModal';

const FormQrCode:React.FC = () => {
    const { totalPrice } = useOrderModal(); 
 
    return (
        <div className='flex-center h-full flex-col gap-5'>
            <QRCode value='1234567'/>
            <p className='text-lg font-medium'>{totalPrice}$</p>
            <p className='text-gray-500'>Please scan this to payment </p>
        </div>
    )
}

export default FormQrCode