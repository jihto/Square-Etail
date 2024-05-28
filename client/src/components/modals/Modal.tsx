import { motion } from "framer-motion";
import { MdClose } from "react-icons/md"; 
import IconButton from "../buttons/IconButton";
import { memo, useEffect, useRef } from "react"; 
import Line from "../Line";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string | React.ReactNode; 
    className?: string;
    action?: React.ReactNode;
}

const Modal: React.FunctionComponent<ModalProps> = memo(({
    isOpen,
    onClose,
    children,
    className = "", 
    title = "",
    action,
}) => {
    // const modalRef = useRef<HTMLDivElement>(null); 
    // useEffect(() => {
    //     const handleOutsideClick = (event: MouseEvent) => {
    //         if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
    //             onClose();
    //         }
    //     };

    //     isOpen
    //         ? document.addEventListener('mousedown', handleOutsideClick)
    //         : document.removeEventListener('mousedown', handleOutsideClick);

    //     return () => document.removeEventListener('mousedown', handleOutsideClick); 
    // }, [isOpen, onClose]); 
    if(!isOpen)
        return null;  
    return (
        <motion.div
            className={`
                fixed z-50 bg-black bg-neutral-800/70 overflow-hidden w-full inset-0 
                flex-center 
            `}
            style={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.8 }}
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.8 }}
            transition={{ duration: 0.3 }} 
        >
            <motion.div
                // ref={modalRef} 
                className={`
                    ${className || "w-[95%] md:w-1/2 xl:w-1/3 h-fit"} relative bg-white rounded-3xl
                `}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
                transition={{ duration: 0.3 }}
            >
                <div className="h-fit px-5 pt-3 relative">
                    <div className='font-medium text-center text-xl py-3'> { title ? title : <p></p>} </div>
                    <IconButton icon={MdClose} className="absolute right-4 top-4 bg-white border-none" hanldeClick={onClose}></IconButton> 
                </div> 
                { title ? <Line/> : null }
                <div className="px-5 pb-5">
                    {children} 
                </div>
                {
                    action 
                    ?  <>
                            <Line/>
                            <div className="flex-between w-full px-5 py-4">
                                {action}
                            </div> 
                        </>
                    : null
                }
            </motion.div>
        </motion.div>
    );
});

export default Modal; 