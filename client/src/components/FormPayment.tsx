
import usePaymentForm from '../hooks/usePaymentForm';
import { PaymentElement } from '@stripe/react-stripe-js'; 
import { Button } from './buttons/Button'; 

const FormPayment = () => {
    const { handleSubmit } = usePaymentForm(); 
    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-5 mb-3 px-5'> 
            <PaymentElement id="payment-element" />
            <Button type='submit'>Payment</Button>
        </form>
    )
}

export default FormPayment