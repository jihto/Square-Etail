import moment from 'moment';
import useOrderDetailsModal from '../../hooks/zustands/useOrderDetailsModal'
import Modal from './Modal'
import Each from '../../middlewares/Each';
import { ItemInTheCartDto } from '../../types/Cart.dto';
import ItemCartProduct from '../ItemCartProduct';
import Box from '../Box';   
import Process from '../Proccess'; 
import GroupButton from '../buttons/GroupButon';
import FormField from '../inputs/FormField';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { OrderDto } from '../../types/Order.dto';
import toast from 'react-hot-toast'; 
import { RootAdminOrdersAction } from '../../redux/reducers/adminOrdersReducer';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { putCancelOrder, putConfirmOrder } from '../../redux/actions/adminOrdersActions';

interface FormValuesDetail{
    phone: string;
    code: string;
    address: string;
}

const OrderDetailsModal = () => {
    const { data, onClose, isOpen, isAdmin } = useOrderDetailsModal();  
    const [orderDetails, setOrderDetails] = useState<OrderDto | null>(null); 
    const { register, setValue } = useForm<FormValuesDetail>();   
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootAdminOrdersAction>>();  
    const handleConfirmOrder = async() => {
        try {
            if(data){
                const response: string = await dispatch(putConfirmOrder(data.id));  
                toast.success(response) ;
                onClose();    
            }
        } catch (error: any) {
            console.log({error});
            toast.error("Confirm order fail!!")
        }
    }

    const handleCancelOrder = async() => {
        try {
            if(data){
                const response: string = await dispatch(putCancelOrder(data.id));   
                toast.success(response) ;
                onClose();    
            }
            onClose();
        } catch (error: any) {
            console.log({error});
            toast.error("Cancel order Fail!!")
        }
    }

    useEffect(() => {
        if(data){  
            setOrderDetails({...data}); 
            setValue("phone", data?.phone);
            setValue("address", data?.address);
            setValue("code", data?.paymentId)
        }
    }, [data])   
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="w-[95%] md:w-2/3 xl:w-2/5 h-[90%]"
            title={`Order Details`} 
        >
            <div className="w-full h-fit grid gap-1 md:gap-2 xl:gap-3 px-2 md:px-6"> 
                    <p className='font-medium text-lg'>Order {orderDetails?.id}  - Customer : {orderDetails?.customerName}</p>
                    <p className='text-gray-400 text-base font-normal'>Date: {moment(orderDetails?.createdAt).format("kk:mm:ss YYYY/MM/DD")}</p>
                    { isAdmin 
                        ? null 
                        : <Process 
                            step={4}
                            state={data?.status === "pending" ? 1 : data?.status === "processing" ? 2 : data?.status === "done" ? 3 : 4 } 
                            title={['Order', 'confrim', 'Done', "Cancel"]} date={[orderDetails?.createdAt ?? ""]}
                        />
                    }
                    <div className='lg:grid lg:grid-cols-2 justify-between flex flex-col gap-1 xl:gap-5 font-medium text-gray-500'>
                        <FormField register={register("phone")} name='Customer name' labelName='Customer phone' disable={true}/> 
                        <FormField register={register("code")} name='Code order' labelName='Code Order' disable={true}/>  
                    </div>
                    <FormField register={register("address")}  name='Address' labelName='Address' disable={true} />  
                    <p className='font-medium'>Order items:</p>
                    <Box className='overflow-y-scroll overflow-x-hidden max-w-5/6 h-[330px] px-10 lg:h-[380px]'>
                        <div className='h-full flex flex-col w-full gap-3'>
                            <Each
                                of={orderDetails?.products as ItemInTheCartDto[] ?? []}
                                render={(item: ItemInTheCartDto) => (
                                    <ItemCartProduct {...item} />
                                )}
                            /> 
                        </div> 
                    </Box>  
                    <div>
                    <div className='flex justify-end text-lg'>
                        <p className='justify-between w-2/3 sm:w-2/5 lg:w-[30%] flex'><strong>Total Price: </strong> ${orderDetails?.totalPrice}</p> 
                    </div>
                    {
                        isAdmin 
                            ? (
                                <>  
                                    <div className='flex justify-end text-lg py-2'>
                                        <p className='flex justify-between w-2/3 sm:w-2/5 lg:w-[30%]'><strong>Payment with: </strong>  Card</p>
                                    </div>
                                    <GroupButton 
                                        action={handleConfirmOrder} 
                                        label={"Confirm"} 
                                        labelSecondary={"Cancel Order"} 
                                        secondAction={handleCancelOrder}
                                        secondaryButtonClass='bg-red-400 text-white'
                                    />
                                </>
                            )
                            :null
                    } 
                    </div>
                </div> 
        </Modal>
    )
}  

export default OrderDetailsModal