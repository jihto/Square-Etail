import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Each from '../middlewares/Each';
import { NotificationDto } from '../types/Notification.dto';
import moment from 'moment';
import { GoDotFill } from 'react-icons/go';
import Heading from './Heading'; 
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootNotificateAction } from '../redux/reducers/notificationReducer';
import { updateReadingNotificate } from '../redux/actions/notificationAction';
import Empty from './Empty'; 
import { CiBellOn } from 'react-icons/ci';  
const Notification = () => {  
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootNotificateAction>>();
    const { notifications } = useSelector((state: RootState) => state.notification);   
     
    return (  
        <div className='absolute top-0 left-0 w-full bg-white z-10 rounded-xl px-5 flex gap-3 flex-col py-5 shadow-lg'>
            <p className='text-xl font-medium'>Notification</p>
            <hr/>
            <div className='h-[500px] overflow-y-auto overflow-x-hidden flex flex-col gap-3'> 
                {
                    Array.isArray(notifications) && notifications.length > 0
                        ? <Each
                            of={notifications}
                            render={(item: NotificationDto)=> 
                                <div 
                                    onClick={() => dispatch(updateReadingNotificate(item?._id))}
                                    className='border-b-2 rounded-lg p-1 xl:p-4 text-gray-600 hover:shadow-lg h-fit grid grid-cols-[2fr,1fr]' 
                                >
                                    <Heading title={item?.title} className='flex max-w-96 flex-wrap'>
                                        {item?.content}
                                    </Heading> 
                                    <div className='grid-end justify-items-end'>
                                        {item?.isReading ? <p></p> : <GoDotFill  className='text-secondary' size={15}/> }
                                        <p>{moment(item?.timeStamp).format(' h:mm a, MMMM Do YYYY')}</p>       
                                    </div>
                                </div>
                            }
                            />  
                        : <Empty icon={CiBellOn } size={50} isButton={false} title="There hasn't any notification"/>  
                }
            </div>
        </div>  
    )
}

export default Notification