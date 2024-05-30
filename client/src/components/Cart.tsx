import GroupButon from './buttons/GroupButon';
import Container from './Container';
import ItemCartProduct from './ItemCartProduct';
import Each from '../middlewares/Each'  ;
import useOrderModal from '../hooks/zustands/useOrderModal' ;
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { ItemInTheCartDto } from '../types/Cart.dto';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootCartAction } from '../redux/reducers/cartReducer';
import { deleteItemFromTheCart } from '../redux/actions/cartActions';
import toast from 'react-hot-toast';
import Empty from './Empty';
import useAuthenticationModal from '../hooks/zustands/useAuthenticationModal';

const Cart = () => {    
    const { cart } = useSelector((state: RootState) => state.cart);  
    const orderModal = useOrderModal(); 
    const { onOpen } = useAuthenticationModal();
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootCartAction>>();
    const handleOrder = () => cart.products?.length > 0 ? orderModal.onOpen(cart.products) : toast.error("Cart is empty"); 
    return (
        <Container className='items-baseline absolute top-0 w-full'>
            <p className='text-xl font-medium'>Your Cart</p>
            <div className=' overflow-y-scroll overflow-x-hidden h-[400px]  '> 
                <div className='scroll-mt-6 snap-start grid gap-2'>
                {
                    cart.products?.length > 0
                    ?  <Each
                            of={cart.products}
                            render={(item: ItemInTheCartDto)  => <ItemCartProduct onRemoveItem={() => dispatch(deleteItemFromTheCart(item.product))} {...item}/>}
                        />  
                    : <Empty title= "Hasn't Product in the cart" />
                }
                </div>
            </div>
            <hr/>
            <div className='flex justify-between px-5 text-lg'>
                <p>Total Quantity: <strong>{cart?.quantity}</strong></p>
                <p>Total Price: <strong>{cart?.totalPrice}</strong></p>
            </div> 
            <GroupButon 
                label='Check out'
                labelSecondary='Remove All'
                action={() => cart._id ? handleOrder() : onOpen()}
                secondAction={()=>dispatch(deleteItemFromTheCart())}
                secondaryButtonClass='text-white shadow bg-[#ff6b6b]'
                primaryButtonClass='bg-[#4a4fff] text-white shadow shadow-secondary'
            />
        </Container>
    )
}

export default Cart