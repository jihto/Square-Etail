import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'; 
import { FormEvent } from 'react';  
import { apiRequest } from '../redux/api'; 
 
function usePaymentForm() {
    const stripe = useStripe();
    const elements = useElements(); 
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault(); 
        try { 
            const amountToCharge = 100; 
            console.log("pas");

            const cardElement = elements?.getElement(CardElement);  
            console.log(stripe);
            console.log(elements);
            console.log(cardElement)
            if(stripe && elements && cardElement){ 
                const stripeResponse = await stripe.createPaymentMethod({
                    type: 'card',
                    card: cardElement
                });
            
                const { error, paymentMethod } = stripeResponse;
                
                if (error || !paymentMethod) {
                    return error;
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
                return response;
            }
        } catch (error: any) {
            console.log(error.message)   
        }
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