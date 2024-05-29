import { NavLink, Outlet } from 'react-router-dom'
import { NavAdminLists, NavListsProps } from '../../constants'
import { HiLogout } from 'react-icons/hi'
import { useSelector } from 'react-redux' 
import { RootState } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootAdminAction } from '../../redux/reducers/adminReducer'
import { adminLogout } from '../../redux/actions/adminActions'

const NavbarAdmin = () => {
    const { admin } = useSelector((state: RootState) => state.admin);
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootAdminAction>>();   
    const handleLogOut = () => dispatch(adminLogout());
    return ( 
        <nav className='grid items-start grid-cols-[1fr,6fr] h-screen'>
            <nav className='grid grid-rows-4 text-center w-full gap-5 border-r-2 h-screen items-center'>
                <div className='grid-center lg:flex-center gap-5 lg:px-2'>
                    <div className='w-16 h-16 bg-secondary rounded-2xl flex justify-center items-center text-white text-xl'>T</div>
                        <div>
                            <p>DashBoard</p>  
                            <p className='text-gray-400'>{admin?.username || "Admin"}</p>                        
                        </div>
                    </div>
                    <div className='grid'>
                        {
                            NavAdminLists.map((item:NavListsProps, index: number) => (
                                <NavLink to={item.link} key={index} className={({isActive}) => {
                                    return `flex-center font-medium items-center px-5 md:px-0  w-fit lg:w-2/3 ml-1 md:ml-3 lg:mx-10 my-2 py-4 gap-5 
                                        ${isActive ? "text-white bg-secondary rounded-lg" : "text-gray-400"}`
                                } }> 
                                    <item.icon size={25}/>
                                    <p className='hidden md:block'>{item.name} </p> 
                                </NavLink>
                            ))
                        }
                    </div>  
                    <nav></nav> 
                    <NavLink to={'/auth'} onClick={handleLogOut} className={({isActive}) => {
                        return `flex font-medium w-5/6 py-4 pl-10 items-center justify-items-center gap-5 rounded-xl
                            ${isActive ? "text-secondary" : "text-gray-500"}`
                    } }> 
                        <HiLogout size={25}/>
                        <p className='hidden md:block'>Log Out</p>
                    </NavLink>  
                </nav>
            <Outlet/>
        </nav> 
    )
}

export default NavbarAdmin