import React, { useState } from 'react'
import QRCode from 'react-qr-code'
import useOrderModal from '../../hooks/zustands/useOrderModal';
import FormField from './FormField';
import { useForm } from 'react-hook-form';
import { Button } from '../buttons/Button';

interface FormValuesPayment{
    username: string;
    address: string;
    phone: string;
}


const FormQrCode:React.FC = () => {
    const { totalPrice } = useOrderModal(); 
    const [ isGenerateQR, setIsGenerateQR ] = useState<string>("");
    const { register, handleSubmit, formState:{ errors } } = useForm<FormValuesPayment>();
    const onSubmit = (value: FormValuesPayment) => { 
        // Xử lý thông tin thanh toán ở đây
        const momoPaymentData = `momowallet://pay?amount=${totalPrice}&receiver=${value.phone}`; 
        setIsGenerateQR(momoPaymentData);
    };
    return (
        <>
            {
                isGenerateQR
                    ?<div className='flex-center h-full flex-col gap-5'>
                        <QRCode value={isGenerateQR}/>
                        <p className='text-lg font-medium'>{totalPrice}$</p>
                        <p className='text-gray-500'>Please scan this to payment </p>
                    </div> 
                    : <div className='flex h-full mx-5 flex-col gap-3 px-5 my-4'>
                        <h2 className="text-xl text-start">Generar QR</h2> 
                        <FormField 
                            register={register("username", {
                                required: "username is required",
                            })} 
                            name='username' 
                            placeholder='Input name...' 
                            labelName='Name'
                            error={errors?.username?.message}
                        /> 
                        <FormField 
                            register={register("address", {
                                required: "address is required",
                            })} 
                            name='address' 
                            placeholder='Input your location...' 
                            labelName='Customer address'
                            error={errors?.address?.message}
                        />
                        <FormField 
                            register={register("phone", {
                                required: "phone is required",
                            })} 
                            name='phone' 
                            placeholder='Input your phone...' 
                            labelName='Phone number'
                            type='number'
                            error={errors?.username?.message}
                        />
                        <hr/>
                        <Button handleSubmit={handleSubmit(onSubmit)}>Generate QR payment</Button>
                    </div>
            } 
        </>
       
    )
}

export default FormQrCode