import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'; 
import { FormEvent } from 'react';  
import { apiRequest } from '../redux/api';
 
function usePaymentForm() {
    const stripe = useStripe();
    const elements = useElements(); 
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault(); 
        const amountToCharge = 100; 
        const cardElement = elements?.getElement(CardElement); 
        if (!stripe || !elements || !cardElement) {
            return;
        }
    
        const stripeResponse = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        });
    
        const { error, paymentMethod } = stripeResponse;
    
        if (error || !paymentMethod) {
            return;
        }
    
        const paymentMethodId = paymentMethod.id;
    
        const response = await apiRequest({
            url: "user/charge",
            data: {
                paymentMethodId,
                amount: amountToCharge,
            },
            method: "POST",
        })   
        console.log({response})
    };
    

    const getClientSecret = async () => {
        const response = await apiRequest({
            url: "user/create-payment-intent",
            data: {},
            method: "POST",
        })   
        console.log(response.message)
    }
    return {
        getClientSecret,
        handleSubmit
    }
}

export default usePaymentForm;