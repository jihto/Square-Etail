import { memo, useEffect, useState } from 'react';
import Modal from './Modal'; 
import Box from '../Box';
import Each from '../../middlewares/Each';
import useImageModal from '../../hooks/useImageModal';
import {   CiImageOn } from 'react-icons/ci';
import { useForm } from 'react-hook-form';
import FormField from '../inputs/FormField';
import GroupButton from '../buttons/GroupButon';
import useChangeProductModal from '../../hooks/zustands/useChangeProductModal';  
import toast from 'react-hot-toast';
import FormMultipleField from '../inputs/FormMultipleField';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../redux/store';
import { RootProductAction } from '../../redux/reducers/productReducer';
import { postCreateProduct, postUpdateProduct } from '../../redux/actions/productActions';
import { useSelector } from 'react-redux';
import { compareObjects } from '../../utils/compareObjects'; 
import FormSelected from '../inputs/FormSelected';  
import { CategoryProps } from '../../types/Category.interface';
import { compareArray } from '../../utils/compareArray';
 
interface FormValues{
    description: string;
    name: string;
    price: number;
    stock: number;  
}


interface ImageProps{
    imageSrc: string;
    image: File | null;
}

const ChangeProductModal: React.FC = () => { 
    const { isOpen, onClose, data } = useChangeProductModal();  
    const [currentImgUpload, setImgUpload] = useState<number>(0);
    const [imgProduct, setImgProduct] = useState<ImageProps[]>(new Array(3).fill(null)); 
    const [error, setError] = useState<number>(-1);
    const imageModal = useImageModal();     
    const [categories, setCategories] = useState<CategoryProps[] >([]); 
    const [size, setSize] = useState<string[]>(['small', 'medium', 'large']);
    const { register, handleSubmit, setValue, formState: { errors }} = useForm<FormValues>({ mode: "onChange" });   
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootProductAction>>();     
    const { isLoading }  = useSelector((state: RootState) => state.products);  
    const handleUploadImage = (index: number) => {
        imageModal.onOpen();   
        setImgUpload(index)
    }  
    const onSubmit = async(values: FormValues) =>{
        const index: number  = imgProduct.findIndex(i => i === null); 
        if(index !== -1){  
            setError(index); 
        }else{ 
            if(!data && imgProduct[0].image && imgProduct[1].image && imgProduct[2].image && categories.length > 0){
                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("description", values.description);
                formData.append("price", String(values.price));
                formData.append("stock", String(values.stock));
                formData.append("picture1", imgProduct[0].image);
                formData.append("picture2", imgProduct[1].image);
                formData.append("picture3", imgProduct[2].image);  
                formData.append('size', JSON.stringify(size));
                formData.append('categories', JSON.stringify(categories.map(i => i.id)));  
                const result: string = await dispatch(postCreateProduct(formData));
                toast.success(result);  
                onClose();
            }else if (categories.length === 0){
                setError(4);
            } else if(data){   
                const dataCategoriesUpdate = compareArray(categories, data.categories);  
                const dataUpdate = compareObjects(data, {...values, size });  
                if(Object.keys(dataUpdate.obj2).length !== 0 || dataCategoriesUpdate.length > 0){
                    const formData = {
                        ...dataUpdate.obj2, 
                        ...(dataCategoriesUpdate.length > 0 && { categories: JSON.stringify(dataCategoriesUpdate.map(i => i.id))}),
                        ...(imgProduct[0].image  && { picture1: imgProduct[0].image  }),
                        ...(imgProduct[1].image  && { picture2: imgProduct[1].image  }),
                        ...(imgProduct[2].image  && { picture3: imgProduct[2].image  }),
                    } 
                    try {
                        const result: string = await dispatch(postUpdateProduct(data.id, formData));
                        toast.success(result);
                        onClose();
                    } catch (error) {
                        toast.error("Update Fail")
                    }
                }else{
                    toast.error("Nothing to update")
                }
            } 
        } 
    }

    const handleClose = () =>  imageModal.isOpen ? imageModal.onClose() : onClose();  
    useEffect(() => {   
        if(data){  
            setValue( 'name', data?.name || '')
            setValue('description', data?.description || '')
            setValue('price', data?.price || 0)
            setValue('stock', data?.stock || 0) 
            setSize(data?.size || [])
            setCategories(data?.categories || []);
            setImgProduct([
                {imageSrc: data?.picture1 || "", image: null}, 
                {imageSrc: data?.picture2 || "", image: null},
                {imageSrc: data?.picture3 || "", image: null},
            ]);     
        }
        if(!data){
            setValue('price', 0);
            setValue('stock', 0);
            setValue("description", "");
            setValue("name", ""); 
            setSize([]);
            setImgProduct(new Array(3).fill(null)); 
        }
    } , [data, isOpen]);  
 

    useEffect(() => {
        if(imageModal.uploadImage){
            const imageUrl = URL.createObjectURL(imageModal.uploadImage)
            setImgProduct(imgProduct.map((_item: ImageProps, i: number) => i === currentImgUpload ? {imageSrc: imageUrl, image: imageModal.uploadImage} : _item ));  
        }
    }, [imageModal.uploadImage])

    return (
        <Modal 
            isOpen={isOpen}
            onClose={handleClose}
            title={<p className='text-xl ml-5 font-medium'>{data ? "Update Product" : "Create Product"}</p>} 
            className="max-h-screen w-[95%] md:w-2/3 xl:w-[35%] h-min-fit relative"
        >
            <div className='grid gap-4 px-5'>  
                <p className='font-medium'>Upload Image: </p>
                <div className='flex gap-4'>
                    <Each 
                        of={imgProduct}
                        render={(item: ImageProps, index: number) => 
                            <Box 
                                onClick={() => handleUploadImage(index)}    
                                className={`flex-1 h-32 shadow-md justify-center items-center ${ error === index ? "border-red-400" : "border-gray-200" }  border-[1px]`}>
                                { 
                                    item
                                        ? <img className='rounded-lg max-h-32 object-cover' src={item.imageSrc}/>
                                        : <p><CiImageOn size={40}/></p>
                                } 
                            </Box> 
                        }
                    /> 
                </div>   
                <hr/>
                <FormField 
                    register={register("name", {
                        required: "name is required",
                    })}  
                    name='name' 
                    placeholder='Name...' 
                    labelName='Product name: '
                    error={errors?.name?.message}
                />
                <label className=' text-gray-500'>Product description</label>
                <textarea className='border text-gray-600 h-[80px] bg-gray-50 border-gray-300 rounded-md ps-3 pt-2 outline-none max-h-[100px]' placeholder='Write description...' {...register("description", {
                        required: "description is required",
                })}></textarea> 
                <div className='grid grid-cols-2 gap-10 justify-between'>
                    <FormField  
                        register={register("price", {
                            required: "price is required",
                        })} 
                        type='number'
                        name='price' 
                        placeholder='...' 
                        labelName='Price'
                        error={errors?.price?.message}
                    />
                    <FormField 
                        register={register("stock", {
                            required: "stock is required",
                        })} 
                        name='stock' 
                        type='number'
                        placeholder='...' 
                        labelName='Stock'
                        error={errors?.price?.message}
                    />
                </div> 
                <FormMultipleField 
                    title='Size'
                    placeholder='Add more size' 
                    list={size} 
                    onChangeList={setSize}
                />
                <FormSelected 
                    title='Categories'
                    values={categories}
                    onValues={setCategories}
                    error = {error === 4}
                />
                <hr/>
                <GroupButton 
                    disable={isLoading} 
                    action={handleSubmit(onSubmit)}
                    label={data ? "Update" : "Create"}
                    labelSecondary={"Cancel"}
                    secondAction={onClose}
                />
            </div>
        </Modal>
    )
} 

export default memo   (ChangeProductModal);