import ProductSkeleton from '../ProductCatalog/ProductSkeleton' 
import React from 'react'; 
import { ProductDetailsDto } from '../../../types/ProductDetails.interface';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';  
import Each from '../../../middlewares/Each';
import Empty from '../../common/Empty';
import Product from '../ProductCatalog/Product';


const DisplayProducts: React.FC = () => {  
    const { isLoading, products, error }  = useSelector((state: RootState) => state.products);    
    return ( 
        <div className='flex place-items-center flex-wrap justify-center mx-auto w-full gap-3'>
            {isLoading ? (
                <ProductSkeleton items={18}/>
            ) : error 
                ? (<Empty/>) 
                : ( <Each 
                        of={products}
                        render={(item: ProductDetailsDto) => ( 
                            <Product  
                                viewDetails
                                {...item}    
                            > </Product>
                        )}
                    />  
            )}
        </div>  
    )
}

export default DisplayProducts