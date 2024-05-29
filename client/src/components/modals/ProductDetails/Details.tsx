import { CiShoppingBasket, CiShoppingCart } from "react-icons/ci";
import Each from "../../../middlewares/Each";
import { ProductDetailsDto } from "../../../types/ProductDetails.interface";
import Heading from "../../Heading"; 
import GroupButton from "../../buttons/GroupButon";
import { memo, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../redux/store";
import { RootCartAction } from "../../../redux/reducers/cartReducer";
import { useSelector } from "react-redux";
import { changeItemInTheCart } from "../../../redux/actions/cartActions";
import toast from "react-hot-toast";
import Box from "../../Box";
import useProductDetailsModal from "../../../hooks/zustands/useProductDetailsModal";
import useToast from "../../../hooks/useToast";
import { NavLink } from "react-router-dom";
import useOrderModal from "../../../hooks/zustands/useOrderModal";
import { IoAdd, IoRemove } from "react-icons/io5";
import { CategoryProps } from "../../../types/Category.interface";
import useAuthenticationModal from "../../../hooks/zustands/useAuthenticationModal";


const Details: React.FC<ProductDetailsDto> = (data) => {   
    
    const [currentImage, setCurrentImage] = useState<number>(0);
    const handleImageChange = (step: number) => setCurrentImage(step); 
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootCartAction>>();
    const { error, isLoading }  = useSelector((state: RootState) => state.cart); 
    const { user }  = useSelector((state: RootState) => state.auth);  

    const { onClose } = useProductDetailsModal();
    const { onShow } = useToast();
    const [size, setSize] = useState<string>(data ? data.size[0] : "0");
    const [quantity, setQuantity] = useState<number>(1);
    const login = useAuthenticationModal();
    const { onOpen } = useOrderModal();
    const handleAddToTheCart = () => {   
        setTimeout(()=>{
            dispatch(changeItemInTheCart({product: {...data, size: [size]}, count: quantity}));
            error ? toast.error(error) : onShow({ name: data?.name, picture: data?.picture1 });
        }, 400); 
        onClose();
    } 

    const handleOrderProducts = async() => {
        onClose();
        onOpen([{product: {...data, size: [size]}, count: quantity}]);
    }
    return (
        <>
            <div className='h-72 lg:max-h-96 bg-gray-200 p-2 rounded-lg gap-2 flex'>
                <SwipeableViews
                    axis={'x'}
                    index={currentImage}
                    onChangeIndex={handleImageChange}
                    enableMouseEvents
                    className="overflow-hidden w-full"
                >
                    <img className='h-[300px] w-full rounded-md object-contain bg-white border-white border-2' 
                        src={`${data?.picture1}`} 
                        loading='lazy'
                        alt="product"
                    /> 
                    <img className='h-[300px] w-full rounded-md object-contain bg-white border-white border-2' 
                        src={`${data?.picture2}`} 
                        loading='lazy'
                        alt="product"
                    /> 
                    <img className='h-[300px] w-full rounded-md object-contain bg-white border-white border-2' 
                        src={`${data?.picture3}`} 
                        loading='lazy'
                        alt="product"
                    /> 
                </SwipeableViews>
                <div className="w-1/4 flex flex-col gap-2">
                    <Each 
                        of={[data?.picture1, data?.picture2, data?.picture3]}
                        render={(item, i) => 
                            <img 
                                onClick={()=> setCurrentImage(i)}
                                className={`h-[32%] w-full rounded-md object-contain  border-2 ${i === currentImage ? "border-[#6469ff]" : "border-white"}`}
                                src={`${item}`} 
                                loading='lazy' 
                                alt="product"
                            /> 
                        }
                    /> 
                </div>
            </div>
            <div className='flex flex-col justify-between gap-2 lg:gap-3 w-full'>
                <div className='grid gap-4'>
                    <div className="flex justify-between">
                        <p className='text-lg font-medium uppercase'>{data?.name}</p>
                        <p className='text-3xl font-medium'>${data?.price}</p>
                    </div>
                    <Box className='flex items-center gap-2 w-fit h-fit py-1 rounded-full'>
                        <img src={`${data?.picture1}`} loading='lazy' className='w-10 h-10 rounded-full' />
                        <p>{data?.created_by}</p>  
                    </Box>
                    <div className='flex gap-2 items-center'>
                        <p className='font-medium'>Size:</p>
                        {
                            Array.isArray(data.size)
                                ? <Each 
                                    of={data?.size || []}
                                    render={(item: string)=>(
                                        <Box 
                                            onClick={() => setSize(item)} 
                                            className={`    
                                                rounded-full w-fit px-4 h-10 flex-center cursor-pointer
                                                ${ size === item ? "bg-secondary text-white" : "bg-gray-100"}
                                            `}
                                        >{item}</Box>
                                    )}
                                /> 
                                : null
                        }
                    </div> 
                    <div className="flex gap-2 items-center">
                        <p className="font-medium">Quantity: </p>
                        <Box className="text-secondary w-fit">
                            <button onClick={() => setQuantity(prev => prev - 1)} ><IoRemove size={20}/></button> 
                            <p>{quantity}</p>
                            <button onClick={() => setQuantity(prev => prev + 1)} ><IoAdd size={20}/></button>
                        </Box>
                    </div>
                    
                    <div className='flex gap-2 items-center'>
                        <p className='font-medium'>Categories:</p>
                        <Each
                            of={data?.categories || []}
                            render={(category: CategoryProps) =>
                                <NavLink to={"/shopping/?categories=[" + category.id + "]"} className="text-secondary underline">{category.name}</NavLink>
                            } 
                        />
                    </div>
                    <Heading title='Product Overview:' className='bg-gray-100 overflow-y-auto max-h-40 p-2 rounded-md'>{data?.description}</Heading> 
                </div>
                <div className='absolute bottom-3 w-min-full '> 
                    <GroupButton
                        action={() => user ? handleAddToTheCart() : login.onOpen()}
                        label={<><CiShoppingBasket size={24}/>{isLoading ? "Loading..." :"Add Cart"}</>}
                        labelSecondary={<><CiShoppingCart size={24}/>Order now</>}
                        secondAction={() => user ? handleOrderProducts : login.onOpen()}
                        primaryButtonClass='bg-secondary text-white'
                        secondaryButtonClass='border-2 text-black'
                    />
                </div>
            </div>
        </>
    )
}


export default memo(Details);