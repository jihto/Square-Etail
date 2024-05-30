import { CiTrash } from "react-icons/ci";
import { ItemInTheCartDto } from "../../types/Cart.dto";

 
interface ItemCartProductProps extends ItemInTheCartDto{
  actionButton?: boolean;
  onRemoveItem?: (_id: string) => void;
}


const ItemCartProduct:React.FC<ItemCartProductProps> = ({ 
  actionButton = true,
  onRemoveItem, 
  ...data
}) => { 
  return (
    <div className='flex md:gap-5 relative w-full bg-white rounded-md'> 
      {actionButton && onRemoveItem ? <button className="absolute top-2 left-2 lg:relative" onClick={()=>onRemoveItem(data.product?.id)}><CiTrash size={24}/></button>  : <></> }
      <div className='flex w-full border-[1px] border-gray-200 p-2 rounded-2xl'>
        <img src={`http://localhost:8000/${data.product?.picture}`} className='w-16 md:w-36 max-w-36 rounded-lg h-24 object-cover'/> 
        <div className='px-4 w-full'>
          <p className='font-medium text-lg'>{data.product?.name}</p>
          <p className='truncate text-ellipsis max-w-56 overflow-hidden'>{data.product?.description}</p>
          <div className='flex justify-between items-end pr-10'>
            <div className='text-sm text-gray-500 mt-6'>
              <p>Quantity: {data.count}</p> 
            </div>
            <p>${data.product?.price}</p>
          </div>
        </div> 
      </div> 
    </div>
  )
}

export default ItemCartProduct