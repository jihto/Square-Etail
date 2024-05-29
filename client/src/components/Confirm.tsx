import React from 'react';
import useOrderDetailsModal from '../hooks/zustands/useOrderDetailsModal'
import { OrderDto } from '../types/Order.dto'
import Proccess from './Proccess'; 

const Confirm: React.FC<OrderDetailDto> = ({
    ...props
}) => {    
    const { onOpen } = useOrderDetailsModal();  
    const totalPrice: number = Number(props?.quantity)*Number(props?.product?.price);
    const picture: string = props?.product?.picture1.slice(1).replace("http:", "http://");
    const dataOrderDetail: OrderDto = {
        id: props?.id?.toString(),
        customerName: props?.order?.customerName,
        paymentId: props?.order?.paymentId,
        address: props?.order?.address, 
        phone: props?.order?.phone,  
        totalPrice,
        createdAt: props?.order?.createdAt,
        products: [{ product: { ...props?.product, picture1: picture}, count: props?.quantity }]
    }
    return (
        <div onClick={() => onOpen(dataOrderDetail, true)} className={`px-4 gap-0 w-full grid hover:shadow-md border-[1px] bg-gray-100 rounded-xl py-2 text-gray-600 relative`}>
            <p className='text-base'><strong>{props?.product?.name} - #{props.order.paymentId}</strong></p>
            <div className='flex justify-between items-center'>
                <div>
                    <p className='truncate text-ellipsis max-w-56'>Deliver to: {props?.order?.address}</p>
                    <p>Pay with:  Cast</p>
                    <p>Total: {totalPrice}</p> 
                </div>
                <img className='max-w-full h-24 rounded-lg' src={picture}/>
            </div>
            { props.isConfirm ? <Proccess state={1} size='small' step={4} title={['Confirm', 'Processing', 'Please wait', "Cancel"]} /> : null } 
        </div>
    )
}

export default Confirm