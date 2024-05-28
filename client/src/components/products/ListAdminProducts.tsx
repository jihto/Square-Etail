import React, { memo, useRef } from 'react'
import moment from 'moment' 
import { motion } from 'framer-motion';
import { CiEdit } from 'react-icons/ci';
import useChangeProductModal from '../../hooks/zustands/useChangeProductModal';
import { ProductDetailsDto } from '../../types/ProductDetails.interface';
interface ListAdminProductsProps{
    id?: string;
    name?: string;
    description?:string;
    picture1?: string;
    price?: number;
    stock?: number;
    createdAt?: string;
    index?: number; 
    isChecked: boolean;
    onCheckboxChange: (index: string) => void;
}

const ListAdminProducts: React.FC<ListAdminProductsProps> = ({ 
    onCheckboxChange,
    index,
    isChecked,
    ...props
}) => { 
    const { onOpen } = useChangeProductModal();  
    const ref = useRef<HTMLInputElement>(null);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='relative'
        > 
            <div className={`${props.name ? "" : "font-medium text-lg lg:px-20 bg-white"} grid grid-cols-[0.5fr,2fr,1fr,1fr,1fr,3fr,2fr] justify-center w-full items-center`}>
                <input 
                    ref={ref}
                    checked={isChecked}
                    type="checkbox" 
                    onChange={() => onCheckboxChange(props?.id || "")}
                />
                    <p>{props.name ?? "Name"}</p>
                    {props.picture1 ? <img src={props.picture1} className='w-20 h-16 object-contain'/> : <p>Picture</p>}
                    <p>{props.price ?? "Price"}</p>
                    <p>{props.stock ?? "Stock"}</p>
                    <p>{props.createdAt ? moment(props.createdAt).format('MMMM Do YYYY, h:mm:ss a') : "Created At"}</p>
                    {props.name 
                        ? 
                            <button 
                                onClick={ () => props &&  onOpen(props as ProductDetailsDto ?? null)}
                                className='flex justify-start gap-3 w-fit px-4 py-2 items-center text-secondary'>
                                    <CiEdit size={20}/>Update
                            </button> 
                        : <p>Action</p>}
                </div>  
            <hr/>
        </motion.div>
    )
}

export default memo(ListAdminProducts);