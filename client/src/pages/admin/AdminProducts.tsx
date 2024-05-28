import DisplayAdminProducts from '../../components/products/DisplayAdminProducts';
import useChangeProductModal from '../../hooks/zustands/useChangeProductModal';
import { GoPlus } from 'react-icons/go';
import { Button } from '../../components/buttons/Button'; 
import { useForm } from 'react-hook-form';
import IconButton from '../../components/buttons/IconButton';
import { CiCreditCard2, CiEdit, CiSearch, CiTrash, CiViewList } from 'react-icons/ci';
import SwitchButton from '../../components/buttons/SwitchButton';
import { useCallback, useEffect, useState } from 'react';
import { ProductDetailsDto } from '../../types/ProductDetails.interface';
import { getProductsAdmin, postRemoveProduct } from '../../redux/actions/productActions';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootProductAction } from '../../redux/reducers/productReducer';
import { RootState } from '../../redux/store';
import useConfirmModal from '../../hooks/zustands/useConfirmModal';

const AdminProducts = () => { 
    const { onOpen } = useChangeProductModal();
    const confirmModal = useConfirmModal();
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootProductAction>>(); 
    const { register }= useForm<{search: string}>({ mode: "onChange"});  
    
    
    const [isList, setIsList] = useState<boolean>(false);

    const handleEdit = useCallback((data: ProductDetailsDto) => onOpen(data),[]); 
    const handleDelete = useCallback((data: ProductDetailsDto) => {
        const title = "Are you sure to delete this product";
        const content = <img className='object-contain w-full h-full' src={data.picture1}/>
        const action = <> 
            <Button className={` bg-red-400 text-white scale-100 active:scale-105 transition `} handleSubmit={confirmModal.onClose}>Cancel</Button>
            <Button className={` bg-secondary text-white scale-100 active:scale-105 transition `} handleSubmit={()=> { dispatch(postRemoveProduct(data.id)); confirmModal.onClose() }}>Confirm</Button>
        </>
        confirmModal.onOpen(title,content,action ); 
    },[])
    useEffect(()=>{  
        dispatch(getProductsAdmin()) 
    }, []) 
    return (
        <div className='grid gap-2 mt-2'>
            <div className='grid grid-cols-3 gap-5 mx-5 justify-center items-center'> 
                <input 
                    {...register("search")} 
                    className='outline-none bg-gray-50   border shadow-md focus:ring-[#6469ff] focus:border-[#6469ff] text-black my-2 rounded-full ps-5 py-2' 
                    placeholder='Searching...'
                />
                <IconButton icon={CiSearch} hanldeClick={() => {}}/> 
                <div className='flex gap-5'>
                    <Button 
                        className='bg-secondary text-white h-fit py-2 w-fit items-center justify-items-center' 
                        handleSubmit={() => onOpen(null)}
                    > <GoPlus /> Add product</Button> 
                    <SwitchButton state={isList} onState={setIsList} icon={CiViewList} title='List' icon2={CiCreditCard2 } title2='Card'/>
                </div>
            </div>
            <hr/>
            <DisplayAdminProducts 
                isList={isList}
                label={<><CiEdit/> Update</>}    
                secondLabel={<><CiTrash/> Delete</>}
                onAction={handleEdit}
                onSecondAction={handleDelete}
            />
        </div>
    )
}

export default AdminProducts