import { CiTrash } from "react-icons/ci";
import { ItemInTheCartDto } from "../types/Cart.dto";
import Box from "./Box";  
import { IoAdd, IoRemove } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";
import { RootCartAction } from "../redux/reducers/cartReducer";
import { changeItemInTheCart, deleteItemFromTheCart } from "../redux/actions/cartActions";

 
interface ItemCartProductProps extends ItemInTheCartDto{
  actionButton?: boolean;
  onRemoveItem?: (_id: string) => void;
}


const ItemCartProduct:React.FC<ItemCartProductProps> = ({ 
  actionButton = true,
  onRemoveItem, 
  ...data
}) => {  
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootCartAction>>();   
  const handleIncrease: VoidFunction = () => dispatch(changeItemInTheCart({product: data?.product, count: 1})); 
  const handleDecrease: VoidFunction = () => dispatch(deleteItemFromTheCart(data?.product));
  return (
    <div className='flex md:gap-5 relative w-full bg-white border-[1px] boder-gray-200 rounded-xl shadow-md'> 
      {actionButton && onRemoveItem ? <button className="absolute top-2 left-2 lg:relative" onClick={()=>onRemoveItem(data.product?.id)}><CiTrash size={24}/></button>  : <></> }
      <div className='flex w-full p-2 rounded-2xl'>
        <img src={`${data.product?.picture1 || data.product?.picture}`} className='w-16 md:w-36 max-w-36 rounded-lg h-24 object-cover'/> 
        <div className='px-4 w-full'>
          <p className='font-medium text-lg w-fit'>{data.product?.name}</p>
          <p className='truncate text-ellipsis max-w-56 overflow-hidden'>{data.product?.description}</p>
          <div className='flex justify-between items-end '>
            <div className='text-sm flex gap-5 text-gray-500 mt-6'>
              <Box className="w-fit rounded-full px-3 text-secondary">Size: {data.product.size}</Box>
              <Box className="text-secondary">
                { actionButton && onRemoveItem ? <button onClick={handleDecrease} ><IoRemove size={20}/></button> : <></> }
                <p>Quantity: {data.count}</p>
                { actionButton && onRemoveItem ? <button onClick={handleIncrease} ><IoAdd size={20}/></button> :<></>} 
              </Box> 
            </div>
            <p>${data.product?.price}</p>
          </div>
        </div> 
      </div> 
    </div>
  )
}

export default ItemCartProduct