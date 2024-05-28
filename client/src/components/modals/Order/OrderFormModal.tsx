import useOrderModal from "../../../hooks/zustands/useOrderModal"; 
import { Button } from "../../buttons/Button";
import { IoQrCodeSharp } from "react-icons/io5";
import { IoIosCard, IoMdCash } from "react-icons/io"; 
import { MdOutlineArrowBackIos } from "react-icons/md";
import Modal from "../Modal";
import { motion } from "framer-motion";
import FormPaymentCash from "../../inputs/FormPaymentCash";
import { ReactNode, useEffect, useState } from "react";
import FormPaymentCard from "../../inputs/FormPaymentCard";
import Each from "../../../middlewares/Each"; 
import FormQrCode from "../../FormQrCode";
import useConfirmModal from "../../../hooks/zustands/useConfirmModal";


const OrderFormModal:React.FC = () => {
    const { onChangeStep, totalPrice, currentStep, onClose } = useOrderModal();
    const [ typePayment, setIsTypePayment ] = useState<number>(0); 
    const [ animation, setAnimation ] = useState<boolean>(false);
    useEffect(() => {
        setAnimation(!animation);
    }, [typePayment]);

    return (  
        <Modal
            isOpen={currentStep === 1}
            onClose={onClose}
            className=" w-[95%] md:w-2/3 xl:w-1/2 h-min-fit relative"
            title="Order information"
        >  
            <div className='lg:flex grid w-full px-4 gap-5'>     
                {/* Form information order  */} 
                <motion.div 
                    initial={{ x: 0 }} 
                    animate={animation ? { x: '75%' } : { x: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }} 
                    className="w-[58%]"
                >
                    {
                        <Each 
                            of={[<FormPaymentCash/>, <FormPaymentCard/>, <FormQrCode/>]}
                            render={(item: ReactNode, index: number) => index === typePayment ? item : null }
                        /> 
                    } 
                </motion.div> 
                <motion.div 
                    initial={{ x: 0 }}
                    animate={animation? { x: '-150%' } : { x: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="grid gap-2 max-w-[40%] xl:gap-5 bg-gray-100 text-gray-600 p-4 rounded-lg"
                > 
                    <p className="font-medium">Amount & Delivery Date</p>
                    <div className="grid grid-cols-2 justify-center items-center">
                        <p>Item Total</p>
                        <p>{totalPrice} $</p>
                        <p>Delivery Between: </p>
                        <p>19 Nov - 25 Nov 2024</p>
                    </div>  
                    <p className="font-medium">Payment Method:</p> 
                    <hr/>
                    <Button className={`${ typePayment === 0 && "border-secondary text-secondary border-[1px]" } shadow-lg bg-white `} handleSubmit={()=>setIsTypePayment(0)}><IoMdCash />Cash on delivery</Button>
                    <Button className={`${ typePayment === 1 && "border-secondary text-secondary border-[1px]" } shadow-lg bg-white `} handleSubmit={()=>setIsTypePayment(1)}><IoIosCard /> Payment with card</Button> 
                    <Button className={`${ typePayment === 2 && "border-secondary text-secondary border-[1px]" } shadow-lg bg-white`} handleSubmit={()=> setIsTypePayment(2)}><IoQrCodeSharp />Payment with QR</Button> 
                    <hr/>
                    <Button className="bg-white shadow-lg text-secondary" handleSubmit={() => onChangeStep(0)}><MdOutlineArrowBackIos />Back</Button> 
                </motion.div> 
            </div>   
            <p className='text-gray-400 mt-1 mb-3'>Let's help you transport your good for you with ease</p> 
        </Modal>
    )
}

export default OrderFormModal;