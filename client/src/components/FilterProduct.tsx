import React, { useEffect, useState } from 'react' 
import Each from '../middlewares/Each';
import { ListsFilter } from '../constants';
import useSearchImageModal from '../hooks/useImageModal';
import GroupButon from './buttons/GroupButon';
import Container from './Container';  
import { CiImageOn } from 'react-icons/ci';
import IconButton from './buttons/IconButton'; 
import useDebounce from '../hooks/useDebounce';
import useFilter from '../hooks/zustands/useFilter';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../redux/store';
import { RootProductAction } from '../redux/reducers/productReducer';
import { getProductsByImage } from '../redux/actions/productActions';

const FilterProduct:React.FC = () => {   
    const { uploadImage, onSetImage, onOpen } = useSearchImageModal();
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootProductAction>>();
    const searchFilter = useFilter();
    const handleUpload = () => onOpen();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClear: VoidFunction = () => onSetImage(null);

    const handleSearch: VoidFunction = async() => {
        const formData = new FormData();
        if(uploadImage){ 
            formData.append("query_img", uploadImage);
            await dispatch(getProductsByImage(formData)); 
        }
    }

    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    useEffect(() => {
        // Do something with debouncedSearchTerm, like fetch data from API
        searchFilter.onChangeText(debouncedSearchTerm);
        console.log('Debounced search term:', debouncedSearchTerm);
        
    }, [debouncedSearchTerm]);

    return (
        <Container className='absolute top-0 w-full h-full'>
            {/* <div className='flex-1 grid gap-4 font-medium'>
                <p className='text-sm'>Categories:</p>
                <div className='flex flex-wrap gap-3 w-full border-r-2 border-gray-200'>
                    <Each
                        of={ListsFilter}
                        render={(item: ListsFilterProps, index: number)  => <ItemFilter {...item} key={index}/>}
                    />
                </div>
            </div> */}
            {/* <GroupButon 
                label='Search'
                labelSecondary='Clear'
                secondAction={handleClear}
                action={handleSearch}
                primaryButtonClass='text-secondary shadow-secondary shadow'
                secondaryButtonClass='text-red-400 shadow shadow-red-200'
            />   */}


            <p className='text-xl font-medium'>Filter</p>
{/*                 
                <p className='text-sm'>Image Search:</p> */}

            <div className='flex gap-1'>
                    <div className='flex-1 flex-start w-full gap-4 text-sm'> 
                    <input
                        value={searchTerm}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                        className='border-2 border-gray-200  w-full focus:ring-[#6469ff] focus:border-[#6469ff] px-4 py-2 text-base rounded-md outline-none' 
                        placeholder='Search...' 
                    />
                    <IconButton hanldeClick={() => {}} icon={CiImageOn} /> 
                    <IconButton hanldeClick={() => {}} icon={CiImageOn} />
                </div>
                <div className='flex-1 grid gap-4 font-medium'>
                    <div className='flex-center'>
                        { 
                            uploadImage 
                                ? <img className='mx-5 max-w-[90%] p-px md:max-h-40 rounded-lg object-contain bg-gray-900' onClick={handleUpload} src={URL.createObjectURL(uploadImage)} />   
                                : <IconButton hanldeClick={handleUpload} size={35} icon={CiImageOn} />  
                        }  
                    </div>
                </div>
            </div>
        </Container>
    )
}
 

export default FilterProduct