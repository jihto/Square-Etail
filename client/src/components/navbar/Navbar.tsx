import { NavLists, NavListsIcon } from '../../constants';
import IconButton from '../buttons/IconButton';
import { IconType } from 'react-icons'; 
import React, { useEffect, useRef, useState } from 'react';
import { CiStar, CiUser } from 'react-icons/ci'; 
import Cart from '../Cart';
import Each from '../../middlewares/Each';
import Notification from '../Notification';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { NavListsProps } from '../../constants'; 
import useAuthenticationModal from '../../hooks/zustands/useAuthenticationModal';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { ToastItem } from '../modals/ToastItem';
import { motion } from 'framer-motion'; 

import socketIOClient from 'socket.io-client'; 
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootNotificateAction } from '../../redux/reducers/notificationReducer';
import { postNewNotification } from '../../redux/actions/notificationAction';
 

const ListsMenuUI: Array<React.ReactNode> = [<Notification/>, <Cart/>,]


const Navbar:React.FC = () => {
    const authenticationModal = useAuthenticationModal();
    const [isOpen, setIsOpen] = React.useState<boolean>(false);  
    const [isActiveIconButton, setIsActiveIconButton] = useState<number>(-1);
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootNotificateAction>>(); 
    const { user } = useSelector((state: RootState) => state.auth); 
    const { notifications } = useSelector((state: RootState) => state.notification);    
    const { cart } = useSelector((state: RootState) => state.cart);   

    const navigate = useNavigate(); 
    const handleButton = (currentAction: number) => {
        if(isOpen) 
            setIsOpen(false)
        else{
            setIsActiveIconButton(currentAction);
            setIsOpen(!isOpen);
        }
    }    
    useEffect(() => {
        if(user){
            const socket = socketIOClient(process.env.SOCKET_SERVER_URL || "", {
                query: { userId: user?._id },
            });
    
            socket.on('receiveNotification', (notification) => { 
                dispatch(postNewNotification(notification));
            });
    
            return () => {
                socket.disconnect();
            };
        }
    }, [user?._id]);
    return (
        <>
            <nav className='fixed z-50 bottom-6 md:bottom-10 left-0 w-full'>
                <nav className='w-full flex justify-center '>
                    <nav className={`relative bg-white shadow-lg rounded-xl `}>
                        <div  className={`grid border-spacing-1 border rounded-xl border-blue-200 transition-all duration-700 ${isOpen ? "px-5" : "p-0"}`}> 
                            <motion.div 
                                initial={{opacity:0, paddingTop: "0px", height: 0 }} 
                                animate={{opacity:100, paddingTop: isOpen ? "600px" : "0px" }} 
                                transition={{ duration: 0.5 }}
                                className={` bg-white w-full h-fit z-0 relative`}
                            >{
                                isOpen 
                                ? <Each
                                        of={ListsMenuUI}
                                        render={(item: React.ReactNode, index: number)  => isOpen && index === isActiveIconButton ? item : null}
                                    />  
                                : null
                            } 
                            </motion.div> 
                            <div className='flex w-fit gap-2 md:gap-5 justify-center z-50 items-center bg-white p-2 rounded-xl shadow-secondary border-t-2'>
                                <IconButton className='hidden sm:block' icon={CiStar} hanldeClick={() => {}}/>
                                <div className='flex gap-2'>
                                    {
                                        <Each
                                            of={NavLists}
                                            render={(item:NavListsProps, index: number) => (
                                                <NavLink to={item.link} key={index} className={({isActive}) => {
                                                    return isActive 
                                                        ? "text-white bg-secondary w-10 md:w-32 flex justify-center py-2 rounded-xl" 
                                                        : "justify-center flex py-2 rounded-xl w-10 md:w-32 md:flex bg-gray-200 items-center"
                                                } }> 
                                                    <item.icon size={20}/><p className='ml-2 hidden md:block'>{item.name} </p> 
                                                </NavLink>
                                            )}
                                        /> 
                                    }
                                </div>  
                                    {
                                        <Each 
                                            of={NavListsIcon}
                                            render={(icon: IconType, index: number) => (
                                                <div className='relative'>
                                                    <IconButton  
                                                        className={`${isOpen && isActiveIconButton === index && "text-white bg-secondary" }`}
                                                        hanldeClick={()=>handleButton(index)} 
                                                        key={index}
                                                        icon={icon}  
                                                    />
                                                    { index === 0 ? <div className='absolute -top-1 right-0 bg-secondary text-white text-xs flex justify-center items-center rounded-full  w-4 h-4'>{notifications?.filter(item => item.isReading === false).length || 0}</div> : null } 
                                                    { index === 1 ? <div className='absolute -top-1 right-0 bg-secondary text-white text-xs flex justify-center items-center rounded-full  w-4 h-4'>{cart?.quantity || 0}</div> : null } 
                                                </div>
                                            )}
                                        /> 
                                    }
                                <NavLink   
                                    to={user ? '/account' : '#'}
                                    className={({isActive}) => {
                                        return isActive 
                                            ? "text-white bg-secondary px-1 flex-between py-1 rounded-full gap-2" 
                                            : "flex-between rounded-full px-1 bg-gray-200 py-1 gap-2" 
                                    }}  
                                    onClick={() => user ? navigate('/account') : authenticationModal.onOpen()}
                                >
                                {
                                    user
                                        ? (<> <img className='w-8 h-8 rounded-full' src={user?.avatar || "public/images/avatar_default.png"}/> {user?.name} </>)
                                        : <CiUser className='p-[6px]' size={20}/> 
                                }
                                </NavLink>
                            </div>
                        </div>
                    </nav>
                </nav> 
                <ToastItem/>
            </nav>
            <Outlet/>
        </>
    )
}



export default Navbar;