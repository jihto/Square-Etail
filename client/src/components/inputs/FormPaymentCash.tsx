import { useDispatch } from 'react-redux';
import { Button } from '../buttons/Button';
import FormField from './FormField'
import { useForm } from 'react-hook-form';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../redux/store';
import { RootCartAction } from '../../redux/reducers/cartReducer';
import { RootNotificateAction } from '../../redux/reducers/notificationReducer';
import { useSelector } from 'react-redux';
import { postOrder } from '../../redux/actions/orderActions';
import toast from 'react-hot-toast';
import { deleteItemFromTheCart } from '../../redux/actions/cartActions'; 
import useOrderModal from '../../hooks/zustands/useOrderModal';
import useConfirmModal from '../../hooks/zustands/useConfirmModal';
import { TiTickOutline } from 'react-icons/ti';

export interface FormValuesOrder {
    username: string;
    phone: number;
    address:string;
    country: string;
    city: string;
    zipCode: string;
    state: string;
} 

const title = "Order Created Successfull";
const content = <div className='grid justify-center text-gray-600 text-lg font-medium '>
        <div className=' bg-green-400 border border-6 border-green-300 w-44 p-5 h-44 grid justify-center items-center justify-items-center text-white rounded-full m-10 text-xl'>
            <TiTickOutline size={80}/>  
        </div>

        <p>Order Created Successfull</p>
        <div className='flex my-4 justify-between'>
        <p>Code: {"data"}</p>
        <div className='w-px h-full bg-red-400 rounded-3xl'></div>
        <p className='text-blue-400'>Copy link</p> 
        </div>
    </div> 



const FormPaymentCash: React.FC = ({ 
}) => { 
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValuesOrder>({
        mode: "onChange",
    });
    const { data, totalPrice,onChangeStep } = useOrderModal();
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootCartAction | RootNotificateAction>>(); 
    const { user } = useSelector((state: RootState) => state.auth);   
    const { onOpen } = useConfirmModal()
    const onSubmit = async(values: FormValuesOrder) =>{
        const formData = new FormData();
        try {
            if(data &&  user){
                formData.append("customerName", values.username);
                formData.append("paymentId", values.zipCode);
                formData.append("address", `${values.address}, ${values.city}, ${values.country}`);
                formData.append("shoppingCartId", user.cartId);
                formData.append("phone", values.phone.toString()); 
                formData.append("listProducts", JSON.stringify(data));
                formData.append("userId", user?._id as string || '');
                formData.append("totalPrice", totalPrice.toString());
                const response = await postOrder(formData);  
                await dispatch(deleteItemFromTheCart()); 
                onOpen(title,content );
                onChangeStep(-1);   
            } 
        } catch (error: any) { 
            toast.error(error)
        }
    }
    return (
        <div className='w-full grid gap-2 xl:gap-3'> 
            <p className='text-lg'>Payment Information</p>
            <div className='grid grid-cols-2 gap-5'>
                <FormField 
                    register={register("username", {
                        required: "city is required",
                    })} 
                    name='Customer name' 
                    placeholder='Input name...' 
                    labelName='Name'
                    error={errors?.username?.message}
                />
                <FormField 
                    register={register("phone", {
                        required: "Phone is required!",
                        minLength: {
                            value: 10,  
                            message: "Phone must be at least 10 number",  
                        },
                    })}
                    name='phone' 
                    placeholder='Input your phone...' 
                    labelName='Tracking phone'
                    error={errors.phone?.message}
                /> 
            </div>
            <FormField 
                register={register("address", {
                    required: "Address is required",
                })}
                name='address' 
                placeholder='Input your address...' 
                labelName='House Address'
                error={errors?.address?.message}
            /> 
            <div className='grid grid-cols-2 gap-5'>
                <FormField 
                    register={register("city", {
                        required: "city is required",
                    })} 
                    name='city' 
                    placeholder='...' 
                    labelName='City'
                    error={errors?.city?.message}
                />
                <FormField 
                    register={register("country", {
                        required: "Country is required",
                    })} 
                    name='country'
                    placeholder='...' 
                    labelName='Country'
                    error={errors?.country?.message}
                />
            </div>
            <div className='grid grid-cols-2 gap-5'>
                <FormField 
                    register={register("zipCode")} 
                    name='zipCode' 
                    placeholder='...' 
                    labelName='Zip code'
                    error={errors?.zipCode?.message}
                /> 
                <FormField 
                    register={register("state")} 
                    name='state' 
                    placeholder='...' 
                    labelName='State / Provision' 
                /> 
            </div>
            <Button handleSubmit={handleSubmit(onSubmit)}>Cash on delivery</Button>
        </div>
    )
}

export default FormPaymentCash