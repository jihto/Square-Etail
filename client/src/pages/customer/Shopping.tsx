import Categories from '../../components/Categories';
import DisplayProducts from '../../components/products/DisplayProducts';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../redux/store';
import { RootProductAction } from '../../redux/reducers/productReducer';
import { getProducts, getProductsByImage } from '../../redux/actions/productActions';
import { useEffect } from 'react';
import IconButton from '../../components/buttons/IconButton'; 
import { CiImageOn, CiSearch } from 'react-icons/ci'; 
import useImageModal from '../../hooks/useImageModal';
import { IoCloseOutline } from 'react-icons/io5'; 

const Shopping = () => {   
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootProductAction>>(); 
  const { uploadImage, onSetImage, onOpen } = useImageModal();  
  const handleUpload: VoidFunction = () => onOpen();
  const handleClear: VoidFunction = () => onSetImage(null);
  const handleSearch: VoidFunction = async() => {
    const formData = new FormData();
    if(uploadImage){ 
        formData.append("query_img", uploadImage);
        await dispatch(getProductsByImage(formData)); 
    }
  } 
  useEffect(() => {
    dispatch(getProducts({})); 
  },[]);  
  return (
    <>
      <div className='sticky z-10 w-full bg-white top-0 pt-5'>
        <div className='grid justify-between gap-3 grid-cols-3 items-start'>
          <p className='text-xl font-medium pl-2 lg:pl-20'>Product List</p> 
          <div className={`border-2 border-gray-200  relative focus:ring-[#6469ff] focus:border-[#6469ff]  text-base rounded-3xl outline-none`}>
            <input
              value={""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}} 
              placeholder='Search...' 
              className='w-full px-4 py-2 outline-none rounded-3xl'
            />
            <IconButton className='absolute top-0 right-0' icon={CiImageOn} hanldeClick={handleUpload}/>
            { 
              uploadImage 
                  ? <div className='absolute w-fit z-10 right-0 mt-2 shadow h-fit'> 
                      <img 
                        onClick={handleUpload} 
                        src={URL.createObjectURL(uploadImage)} 
                        className='max-w-full md:max-h-40  rounded-lg object-contain shadow' 
                      />
                      <IoCloseOutline size={25} className='absolute top-0 right-0 cursor-pointer' onClick={handleClear}/> 
                    </div>  
                  : null
            }  
          </div> 
            <IconButton icon={CiSearch} hanldeClick={handleSearch} className='bg-secondary text-white'/>  
        </div>
        <Categories/>
      </div>
      <div className='pb-32'> 
          <DisplayProducts /> 
      </div>
    </>
  )
}

export default Shopping