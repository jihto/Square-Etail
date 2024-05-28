import { getProductsInTheTrash, postRestoreProduct } from '../../redux/actions/productActions'
import { useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux'; 
import { RootProductAction } from '../../redux/reducers/productReducer';
import { RootState } from '../../redux/store';
import DisplayAdminProducts from '../../components/products/DisplayAdminProducts';
import useConfirmModal from '../../hooks/zustands/useConfirmModal';

const AdminTrash = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootProductAction>>(); 
    useEffect(()=>{ 
        dispatch(getProductsInTheTrash())
    }, []) 
    return (
        <div className='grid gap-5'>
            <div className='grid grid-cols-2  justify-center items-end gap-5 mt-10 mx-5'>
                <p className='text-2xl font-medium'>Products have deleted!!</p>
                
            </div>
            <hr/> 
            <DisplayAdminProducts  
                label="Restore"
                secondLabel={"Remove"}
                onAction={(data) => dispatch(postRestoreProduct(data.id))}
                onSecondAction={()=> {}}
            />  
        </div>
    )
}

export default AdminTrash