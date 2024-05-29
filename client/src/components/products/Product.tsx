import useProductDetailsModal from '../../hooks/zustands/useProductDetailsModal'; 
import { ProductDetailsDto } from '../../types/ProductDetails.interface';  
import { memo } from 'react'; 
import { motion } from 'framer-motion';
import { updateViewProduct } from '../../redux/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface ProductProps extends ProductDetailsDto{  
    viewDetails?: boolean; 
    children?: React.ReactNode;
}

const Product: React.FC<ProductProps> = ({  
    children,
    viewDetails,
    ...data
}) => {   
    const {onClose, onOpen} = useProductDetailsModal(); 
    const { user } = useSelector((state: RootState ) => state.auth); 
    const handleViewProduct = async() => {  
        await onClose();
        await onOpen(data);
        if(user)
            updateViewProduct(data.id);
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`
                relative rounded-2xl hover:shadow-2xl shadow-sm border-[1px] w-1/3 h-fit lg:w-fit bg-white grid gap-2 hover:border hover:border-blue-300 hover:opacity-90 p-2 min-w-[280px]
            `}
        >
            <img 
                loading='lazy'
                onClick={() => viewDetails ? handleViewProduct(): {} }
                src={`${data.picture1}`} 
                className="border-[1px] cursor-pointer w-[300px] h-[200px] object-contain bg-gray-100 rounded-xl mix-blend-multiply"
            />
            <p className="text-lg max-w-48 truncate ">{data.name}</p>
            <div className='flex justify-between items-start '>
            <p className='text-gray-500'>Quantity: {data.stock}</p>
            <p className="font-medium text-xl">{data.price}$</p> 
            </div>
            <div className='flex justify-between items-center gap-5'> 
                {children}
            </div>
        </motion.div>
    )
}

export default memo(Product)