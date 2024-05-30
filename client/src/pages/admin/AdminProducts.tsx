import DisplayAdminProducts from '../../components/products/DisplayAdminProducts';
import useChangeProductModal from '../../hooks/zustands/useChangeProductModal';
import { GoPlus } from 'react-icons/go';
import { Button } from '../../components/buttons/Button'; 
import { SubmitHandler, useForm } from 'react-hook-form';
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

interface FormValueSearch{
    search: string;
}

/**
 * The AdminProducts component displays a list of products and provides
 * functionalities to search, add, update, and delete products.
 *
 * @returns {JSX.Element} The rendered AdminProducts component
 */
const AdminProducts = () => {  
    // Hook to open the change product modal
    const { onOpen } = useChangeProductModal();
    // Hook to open the confirm modal
    const confirmModal = useConfirmModal();
    // Hook to dispatch Redux actions
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootProductAction>>();
    // Hook to handle form submission
    const { register, handleSubmit } = useForm<FormValueSearch>({ mode: "onChange"});
    // State to toggle between list and card view
    const [isList, setIsList] = useState<boolean>(false);

    /**
     * Handles the form submission for searching products.
     *
     * @param {FormValueSearch} data - The search query
     */
    const onSubmit: SubmitHandler<FormValueSearch> = async(data: FormValueSearch) => {
        dispatch(getProductsAdmin(data.search));
    };

    /**
     * Handles the edit action for a product.
     *
     * @param {ProductDetailsDto} data - The product details
     */
    const handleEdit = useCallback((data: ProductDetailsDto) => onOpen(data), []);

    /**
     * Handles the delete action for a product.
     *
     * @param {ProductDetailsDto} data - The product details
     */
    const handleDelete = useCallback((data: ProductDetailsDto) => {
        const title = "Are you sure to delete this product";
        const content = <img className='object-contain w-full h-full' src={data.picture1}/>
        const action = (
            <>
                <Button className={`bg-red-400 text-white scale-100 active:scale-105 transition`} handleSubmit={confirmModal.onClose}>
                    Cancel
                </Button>
                <Button className={`bg-secondary text-white scale-100 active:scale-105 transition`} handleSubmit={() => {
                    dispatch(postRemoveProduct(data.id));
                    confirmModal.onClose();
                }}>
                    Confirm
                </Button>
            </>
        );
        confirmModal.onOpen(title, content, action);
    }, []);

    // Fetch products on component mount
    useEffect(() => {  
        dispatch(getProductsAdmin());
    }, []);

    // Render the component
    return (
        <div className='grid gap-2 mt-2 w-full'>
            <div className='flex-between gap-3 md:mx-5 w-min-full'> 
                {/* Search input */}
                <div className='md:flex-1 w-full flex gap-3'>
                    <input 
                        {...register("search")} 
                        className='w-2/3 outline-none bg-gray-50   border shadow-md focus:ring-[#6469ff] focus:border-[#6469ff] text-black my-2 rounded-full ps-5 py-2' 
                        placeholder='Searching...'
                    />
                    {/* Search button */}
                    <IconButton icon={CiSearch} className='bg-white border-none shadow-none' hanldeClick={handleSubmit(onSubmit)}/> 

                </div>
                <div className='md:flex-1 flex justify-end items-end gap-5'>
                    {/* Add product button */}
                    <Button 
                        className='bg-secondary text-white h-fit py-2 w-fit hidden md:flex items-center justify-items-center' 
                        handleSubmit={() => onOpen(null)}
                    >
                        <GoPlus /> Add product
                    </Button> 
                    {/* Toggle between list and card view */}
                    <SwitchButton state={isList} onState={setIsList} icon={CiViewList} title='List' icon2={CiCreditCard2} title2='Card'/>
                </div>
            </div>
            <hr/>
            {/* Display the list of products */}
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