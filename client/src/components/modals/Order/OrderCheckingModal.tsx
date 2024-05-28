import { ItemInTheCartDto } from "../../../types/Cart.dto"; 
import Each from "../../../middlewares/Each";
import ItemCartProduct from "../../ItemCartProduct";
import useOrderModal from "../../../hooks/zustands/useOrderModal";
import { Button } from "../../buttons/Button"; 
import Modal from "../Modal";
import { motion } from "framer-motion"; 


const OrderCheckingModal:React.FC = () => {  
    const { onChangeStep, data, currentStep, onClose } = useOrderModal();  
    const totalQuantity: number =  data?.reduce((total: any, el: ItemInTheCartDto) => total += el.count, 0);
    const totalPrice: number =  data?.reduce((total: any, el: ItemInTheCartDto) => total += el.count * el.product.price, 0); 
    return (
        <Modal
            isOpen={currentStep === 0}
            onClose={onClose}
            title="Order checking"
            className=" w-[95%] md:w-2/3 xl:w-[55%] h-min-fit relative"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 100 }}
                transition={{ duration: 1 }} 
                className='grid w-full px-4 gap-5 lg:grid-cols-2 xl:grid-cols-[60%,40%]'
            >    
                <div>
                    <p className="text-lg py-4">Items Order:</p>
                    <div className='w-full overflow-y-scroll overflow-x-hidden h-[330px] lg:h-[350px] '>
                        <div className='scroll-mt-6 snap-start grid gap-2 px-4'>
                            {data 
                                ? <Each
                                    of={data}
                                    render={(item: ItemInTheCartDto)  => <ItemCartProduct {...item}/>}
                                />  
                                : null
                            }
                        </div>
                    </div> 
                </div> 
                <div className="bg-gray-100 rounded-xl grid px-4 py-6 flex-col">
                    {/* <Button>Back </Button> */}
                    <p className="text-lg text-gray-600 font-medium">Order Summary:</p>
                    <div className="grid grid-row-3 items-end text-gray-600">
                        <p>Checking all items before order</p>
                        <div className="grid grid-cols-2 lg:my-10 gap-5">
                            <p>Items Total:  </p>
                            <p>{totalPrice}</p>
                            <p>Items quantity:  </p>
                            <p>{totalQuantity}</p>
                            <p>Discount:  </p>
                            <p>-10$</p>
                            <p>Shipping:  </p>
                            <p>+4$</p> 
                        </div>
                        <hr/>
                        <p className='grid grid-cols-2 items-center gap-5 pb-4'>Total Price: <strong className='text-xl'>${totalPrice}</strong> </p>
                        <Button handleSubmit={()=>onChangeStep(1)} >Order</Button>
                    </div>
                </div> 
            </motion.div>
        </Modal>    
    )
}


export default OrderCheckingModal;