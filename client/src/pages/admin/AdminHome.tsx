import Each from '../../middlewares/Each'
import DashBoardItem from '../../components/DashBoardItem'
import { ListsDashboard } from '../../constants'  
import { DashBoardItemProps } from '../../types/DashBoardItem.interface'  
import { useEffect, useState } from 'react' 
import moment from 'moment'
import Confirm from '../../components/Confirm' 
import Box from '../../components/Box' 
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../redux/store'
import { RootAdminOrdersAction } from '../../redux/reducers/adminOrdersReducer'
import { getDataAdminOrders } from '../../redux/actions/adminOrdersActions'
import { useSelector } from 'react-redux'
import { Button } from '../../components/buttons/Button'
import { GoPlus } from 'react-icons/go'
import IconButton from '../../components/buttons/IconButton'
import { CiBellOn } from 'react-icons/ci'
import useChangeProductModal from '../../hooks/zustands/useChangeProductModal'
import { fetchStatisticAdmin } from '../../redux/api/djangoAPI'
import Notification from '../../components/Notification'
import { getAdminNotifications } from '../../redux/actions/notificationAction'

export interface StatisticProps { 
  totalProducts: number;
  totalViews: number;
  totalCompletedProducts: number;
  totalPeadingProducts: number;
}

const AdminHome: React.FC = () => { 
  const { onOpen } = useChangeProductModal(); 
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootAdminOrdersAction>>();
  const { notifications } = useSelector((state: RootState) => state.notification);     
  const { completedOrders,peadingOrders } = useSelector((state:RootState) => state.adminOrders); 
  const [statistic, setStatistic] = useState<StatisticProps>({
    totalCompletedProducts: 0,
    totalPeadingProducts: 0,
    totalProducts: 0,
    totalViews: 0
  });
  const [isShowNoti, setIsShowNoti] = useState<boolean>(false);
  const { admin } = useSelector((state:RootState) => state.admin);

  useEffect(()=>{ 
    if(admin){
      const getStatisticAdmin = async()=>{
        const result = await fetchStatisticAdmin();
        setStatistic(result);
      };
      getStatisticAdmin();
      dispatch(getDataAdminOrders());   
      dispatch(getAdminNotifications(admin?.id)) 
    }
  }, [])  
  return (
    <div className='flex flex-col gap-5 bg-gray-100 h-full'>
      <div className='flex justify-between pt-5 px-8 '>
        <p className='text-3xl font-medium flex-1'>Dashboard</p> 
        <div className='relative w-1/3'>
          { isShowNoti ? <Notification/> : null}  
        </div>
        <div className='flex gap-5 relative'> 
          <IconButton  icon={CiBellOn} className='border bg-secondary text-white' hanldeClick={() =>setIsShowNoti(!isShowNoti)}/>
          <div className='left-7 -top-2 text-sm text-white bg-red-400 rounded-full w-5 h-5 text-center items-center flex justify-center absolute'>{notifications?.filter(item => item.isReading === false).length || 0}</div>
          <Button className='bg-secondary text-white h-fit w-fit items-center justify-items-center' handleSubmit={() => onOpen(null)}><GoPlus /> Add product</Button>
        </div>
      </div>
      <div className='lg:px-5 flex gap-5'> 
        {
          statistic && <Each 
            of={ListsDashboard}
            render={(item: DashBoardItemProps) => <DashBoardItem count={statistic} {...item}/>}
          />
        }
      </div>
      <div className='grid lg:grid-cols-[2fr,1fr] gap-1 lg:px-5 xl:gap-5'>
        <div className='md:mx-2 mx-0 p-4 bg-white text-black rounded-lg shadow-xl border border-gray-200'> 
          <p className='text-lg font-medium mb-6'>Current order</p>
          <div className='scroll-mt-6 snap-start grid gap-2 items-start overflow-y-scroll overflow-x-hidden h-[300px] lg:h-[600px]'>
            <table className='w-full text-center text-gray-500 ' border={1}>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Product Name</th>
                  <th>Created at</th>
                  <th>Stock</th>
                  <th>Quantity</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                <Each 
                  of={completedOrders ?? []}
                  render={(item: OrderDetailDto) =>  
                    <tr className='border-b-2 border-gray-300 text-center '>
                      <td>{item?.order?.paymentId}</td>
                      <td><p>{item?.product?.name}</p></td>
                      <td className='text-blue-800'>{moment(item?.order?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                      <td>{item?.product?.stock}</td>
                      <td>{item?.quantity}</td>
                      <td className='text-center flex justify-center my-2'>
                        <Box className={`
                          px-4 w-fit 
                          ${ item.status === "processing" 
                            ? "bg-blue-100 text-secondary" 
                            : item.status === "cancel" 
                              ? "text-red-400 bg-red-100" 
                              : "text-green-400 bg-green-100"} 
                        `}>{item.status}</Box>
                      </td> 
                    </tr> 
                  }
                /> 
              </tbody>
            </table>
          </div>
        </div>  
        <div className='md:mx-2 mx-0 p-4 bg-white text-black rounded-lg  shadow-xl border border-gray-200'> 
          <p className='text-lg font-medium mb-6'>Order:</p>
          <div className='scroll-mt-6 snap-start flex flex-col w-full items-start gap-2 overflow-y-scroll overflow-x-hidden h-[380px] lg:h-[600px]'>
            <Each 
              of={ peadingOrders ?? []}
              render={(item: OrderDetailDto ) =>  <Confirm {...item}/>}
            />
          </div>
        </div>
      </div> 
    </div>
  )
}

export default AdminHome