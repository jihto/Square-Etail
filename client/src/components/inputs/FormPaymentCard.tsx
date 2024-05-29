import { Elements } from '@stripe/react-stripe-js';
import FormPayment from './FormPayment';
import { loadStripe } from '@stripe/stripe-js'; 
import { useEffect, useState } from 'react'; 
import { apiRequest } from '../../redux/api'; 


const stripePromise = loadStripe(process.env.PAYMENT_PUBLISHABLE || ""); 
const FormPaymentCard: React.FC = () => {    
    const [clientSecret, setClientSecret] = useState<string>("");
    const getClientSecret = async () => {
        try {
            const response = await apiRequest({
            url: "user/create-payment-intent",
            data: {},
            method: "POST",
        })    
        setClientSecret(response.clientSecret);
        } catch (error) {
            
        }
    }
    useEffect(() => {
        getClientSecret()
    }, []);
    return ( 
        <div className='py-4'> 
            <p className='text-lg'>Payment Information</p>
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <FormPayment/>
                </Elements>)
            }   
        </div> 
    )
}

export default FormPaymentCard