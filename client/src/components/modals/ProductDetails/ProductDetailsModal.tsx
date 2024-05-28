import React, { useEffect, useState } from 'react'
import useProductDetailsModal from '../../../hooks/zustands/useProductDetailsModal'
import Modal from '../Modal';  
import { OutlineButton } from '../../buttons/OutlineButton'; 
import Each from '../../../middlewares/Each'; 
import Review from './Review'; 
import Details from './Details';
import Relative from './Relative'; 

const ListsMenu: string[] = ["Image","Reviews","Relative"]; 

const ProductDetailsModal = () => {
    const {isOpen, data, onClose } = useProductDetailsModal(); 
    const [currentTag, setCurrentTag] = useState<number>(0); 
    useEffect(() =>{  
        setCurrentTag(0)
    },[data])
    if(!isOpen || !data) return null; 
    return (
        <Modal 
            isOpen={isOpen}
            onClose={onClose}
            title="Product Details"
            className="max-h-screen w-[95%] md:w-2/3 xl:w-[40%] h-min-full relative p-0"
        >
            <div className='grid gap-5 h-[93%] lg:h-min-full'>    
                <div className='grid gap-5 '> 
                    <div className='max-h-full'>
                        <div className='flex gap-5 my-2 justify-center'>
                            <Each 
                                of={ListsMenu}
                                render={    
                                    (el: string, index: number) => 
                                        <OutlineButton  
                                            className='shadow-none rounded-none border-secondary'
                                            handleSubmit={()=>setCurrentTag(index)}
                                            isActive = {currentTag === index}
                                        >
                                            {el}
                                        </OutlineButton>
                                }
                            /> 
                        </div>
                        <Each 
                            of={[<Details {...data}/>,<Review productId={data.id}/>, <Relative/>]}
                            render={(item: React.ReactNode, index: number) => currentTag === index ? item : null}
                        /> 
                    </div> 
                </div>
            </div>
        </Modal>
    )
} 

export default ProductDetailsModal