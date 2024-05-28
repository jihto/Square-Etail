import Product from './Product' 
import Empty from '../Empty'
import React, { memo } from 'react'; 
import { ProductDetailsDto } from '../../types/ProductDetails.interface';   
import Each from '../../middlewares/Each';  
import { RootState } from '../../redux/store';  
import { useSelector } from 'react-redux'; 
import ProductSkeleton from './ProductSkeleton';
import ListAdminProducts from './ListAdminProducts'; 
import GroupButton from '../buttons/GroupButon';

interface DisplayAdminProductsProps{
    isList?: boolean;
    label: string | React.ReactNode;
    secondLabel: string | React.ReactNode;
    onAction: (data: ProductDetailsDto) => void;
    onSecondAction: (data: ProductDetailsDto) => void;
}

const DisplayAdminProducts: React.FC<DisplayAdminProductsProps> = ({
    isList,  
    label,
    secondLabel, 
    onAction, 
    onSecondAction
}) => {   
    const { isLoading, products, error }  = useSelector((state: RootState) => state.products);     
    return ( 
        <>
        <p className='pl-10 py-1 font-medium'>Quantity: {products.length}</p> 
        { isList && <ListAdminProducts isChecked={true} onCheckboxChange={() => {}}/> }
        <div className={`flex ${isList ? "flex-col" : "flex-row flex-wrap"} lg:px-20 w-full gap-3 overflow-y-auto overflow-x-hidden h-[820px]`}>
            {isLoading ? (
                <ProductSkeleton items={18}/>
            ) : error 
                ? (<Empty/>) 
                :   Array.isArray(products) && products.length > 0
                    ? <Each
                        of={products}
                        render = {(item: ProductDetailsDto, index: number) =>  
                                isList 
                                    ? <ListAdminProducts 
                                        {...item} 
                                        index={index} 
                                        isChecked={ false}
                                        onCheckboxChange={()=>{}} 
                                    />
                                    : <Product {...item}>  
                                        <GroupButton
                                            label={label}
                                            action={() =>onAction(item) }
                                            labelSecondary={secondLabel}
                                            secondaryButtonClass='bg-red-400 text-white'
                                            secondAction={() => onSecondAction(item)}
                                        />   
                                    </Product>
                                }/> 
                    : <Empty />
            } 
        </div> 
        </>
    )
}

export default memo(DisplayAdminProducts);