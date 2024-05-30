import Each from '../middlewares/Each'  
import { useEffect, useState } from 'react' 
import Category from './Category'
import { ListsFilter } from '../constants'
import { motion } from 'framer-motion'; 
import { getProducts } from '../redux/actions/productActions';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootProductAction } from '../redux/reducers/productReducer'; 
import { RootState } from '../redux/store';
import IconButton from './buttons/IconButton';
import { CiFilter } from 'react-icons/ci';
import useFilterodal from '../hooks/zustands/useFilterModal';
 

const Categories:React.FC = () => {
    const [clickCount, setClickCount] = useState<number>(0);
    const { onOpen } = useFilterodal(); 
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootProductAction>>(); 
    const handleCategory: Function = (index: number) => { 
        dispatch(getProducts({
            createBy: index === 0 ?  "" : ListsFilter[index].name
        }));
        setClickCount(index)
    }
    const [isHidden, setIsHidden] = useState<boolean>(false);
    useEffect(() => { 
        const handleScroll = () => {
            const scrollTop: number = window.pageYOffset || document.documentElement.scrollTop; 
            if(scrollTop > 150){
                setIsHidden(true);
            }else{
                setIsHidden(false);
            } 
        };
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    },[]);  
    return ( 
            <div className='flex-center relative gap-2 mt-2'> 
                <Each 
                    of={ListsFilter}
                    render={(item: any, index: number) => <Category isHidden={isHidden} isActive={index === clickCount ? true : false} onChangeState={() =>handleCategory(index)} {...item}/>}
                />
                <motion.div 
                    animate={{ x: clickCount*122 }}
                    transition={{ duration: 0.3 }} 
                    onClick={() => setClickCount(clickCount + 1)} 
                    className={`absolute w-16 h-[2px] left-[32.5%] snap-x x-0 bg-secondary bottom-0 rounded-full`}
                >
                </motion.div> 
                
                <IconButton icon={CiFilter} hanldeClick={onOpen} text='Filter' className='bg-white px-4 flex-row-reverse gap-3'/> 
            </div>
    )
}

export default Categories