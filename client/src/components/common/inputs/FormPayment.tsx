

import { PaymentElement } from '@stripe/react-stripe-js';  
import { Button } from '../buttons/Button';
import usePaymentForm from '../../../hooks/usePaymentForm'; 
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { postOrder } from '../../../redux/actions/orderActions';
import toast from 'react-hot-toast';

const FormPayment = () => { 
    const { handleSubmit } = usePaymentForm();  
    const { user } = useSelector((state: RootState) => state.auth); 
    const onSubmit = async(e: any) => {
        if(user){
            const data = await handleSubmit(e);
            if(data){
                const formData = new FormData();
                formData.append("customerName", data.username);
                formData.append("paymentId", data.zipCode);
                formData.append("address", `${data.address}, ${data.city}, ${data.country}`);
                formData.append("shoppingCartId", user.cartId); 
                formData.append("listProducts", JSON.stringify(data));
                formData.append("userId", user?._id as string || '');
                formData.append("totalPrice", data?.amountToCharge.toString());
                await postOrder(formData);
            }else{
                toast.error("Card not exists");
            }
        }
    }
    return (
        <form onSubmit={onSubmit} className='flex flex-col gap-5 mt-5 mb-3 px-5'> 
            <PaymentElement id="payment-element" />
            <Button type='submit'>Payment</Button>
        </form>
    )
}

export default FormPayment