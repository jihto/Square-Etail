import Container from "../../components/Container";
import FormIconField from "../../components/inputs/FormIconField";
import { MdMailOutline,  MdOutlinePassword } from "react-icons/md"; 
import { IoEarth, IoLocationOutline } from "react-icons/io5";
import { IoMdTransgender } from "react-icons/io";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FaTelegramPlane } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import GroupButton from "../../components/buttons/GroupButon" ;
import IconButton from "../../components/buttons/IconButton";
import { CiDeliveryTruck, CiLogout } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk" ;
import { RootAuthAction } from "../../redux/reducers/authReducer";
import { updateAvatarUser, updateInformationUser, userLogout } from "../../redux/actions/authActions" ;
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserDto } from "../../types/User.interface";
import { useNavigate } from "react-router-dom";
import { RootOrderAction } from "../../redux/reducers/orderReducer";
import { getOrders } from "../../redux/actions/orderActions" ;
import Each from "../../middlewares/Each" ;
import { OrderDto } from "../../types/Order.dto" ;
import ItemOrder from "../../components/ItemOrder";
import { OutlineButton } from "../../components/buttons/OutlineButton"; 
import SwipeableViews from 'react-swipeable-views';
import { MenuOrderList } from "../../constants";
import useImageModal from "../../hooks/useImageModal";
import { compareObjects } from "../../utils/compareObjects";
import toastActions from "../../utils/toastActions"; 
import Empty from "../../components/Empty";

interface FormValues extends UserDto {
  // password: string;
}

const Account: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootAuthAction | RootOrderAction>>();
  const { user } = useSelector((state: RootState) => state.auth);  
  const { orders } = useSelector((state: RootState) => state.orders);
  console.log(orders.filter(order => order.status === "cancel"))   
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const { onOpen, uploadImage, onClear } = useImageModal(); 
  const navigate = useNavigate();

  const {
    register,
    handleSubmit, 
  } = useForm<FormValues>({
      mode: "onChange",
      defaultValues:{
        name: user?.name,
        address: user?.address,
        country: user?.country,
        city: user?.city, 
        email: user?.email, 
        gender: user?.gender, 
        phone: Number(user?.phone), 
      }
  });   
  
  const handleLogOut: () => void = () => {
    dispatch(userLogout());
    toast.success("Log out success");  
    navigate('/home');
  }   
  const handleStepChange = (step: number) => setActiveStep(step); 
  
  const  onSubmit: SubmitHandler<UserDto> = async(data) => { 
    setIsLoading(true);   
    if(isEdit && user){ 
      const { cartId, token, _id, __v, ...dataUser} = user;   
      const differences = compareObjects(data, dataUser); 
      try { 
        const response: boolean = await dispatch(updateInformationUser(differences.obj1));   
        await toast.promise(
          toastActions(response ? true : false),
            {
                loading: 'Loading...',
                success: <b>Update profile success</b>,
                error: <b>Update profile fail</b>,
            }
        );   
        setIsLoading(false);
        setIsEdit(false);
      } catch (error) {
        setIsLoading(false); 
      }
    } 
    if(!isEdit) {
      alert("Connect"); 
    }
    setIsLoading(false); 
  }

  const handleChangeAvatar = async() => {
    try {
      if(uploadImage){ 
        const formData = new FormData();
        formData.append("avatar", uploadImage);
        const response: boolean =   await dispatch(updateAvatarUser(formData)); 
        await toast.promise(
          toastActions(response ? true : false),
            {
                loading: 'Loading...',
                success: <b>Update avatar success</b>,
                error: <b>Update avatar fail</b>,
            }
        ); 
        onClear();  
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(()=>{
    if (user)
      dispatch(getOrders(user?._id)); 
  }, [])
  return (
    <Container className="gap-5"> 
      <div className="grid md:grid-cols-2 w-full lg:w-[90%] gap-5 lg:mx-20"> 
        <div className="flex-1">
          <div className="flex w-full gap-5 shadow-md rounded-md items-center justify-between p-8 border-[1px]">
            <div className="flex gap-5">
              <img src={user?.avatar || "public/images/avatar_default.png"} className="w-14 h-14 rounded-full"/>
              <div>
                <p className="text-lg font-medium">{user?.name}</p>
                <div className="flex-center gap-2">
                  <button onClick={onOpen} className="border-b-[1px] text-secondary text-sm border-secondary max-w-28 truncate text-ellipsis">{uploadImage ? uploadImage?.name : "Update avatar" }</button>
                  {uploadImage ? <button onClick={handleChangeAvatar} className="text-sm bg-blue-950 text-white px-2 py-1 rounded-md">Upload</button> : null}
                </div>
              </div>
            </div>
            <IconButton hanldeClick={handleLogOut} icon={CiLogout} />
          </div>
          <div className="grid gap-1 xl:gap-5 rounded-md shadow-md xl:p-5">
            <p className="text-lg font-medium">Information user:</p>
            <div className="w-full grid 2xl:grid-cols-2 gap-3 xl:gap-6 rounded-lg p-2 ">
              <div className="grid gap-1 lg:gap-4">
                <p>About</p>
                <FormIconField active={isEdit} name="name" label="Full name:" icon={LuUser2} register={register('name')}/>
                <FormIconField active={isEdit} name="gender" label="Gender:" icon={IoMdTransgender} register={register('gender')}/> 
                <FormIconField active={isEdit} name="country" label="Country:" icon={IoEarth} register={register('country')}/>
                <FormIconField active={isEdit} name="city" label="City:" icon={IoLocationOutline} register={register('city')}/> 
              </div>
              <div className="grid gap-1 lg:gap-4">
                <p>Contact</p>
                <FormIconField active={false}  name="city" label="Email:" icon={HiOutlineMail} register={register('email')}/> 
                <FormIconField active={isEdit} name="phone" type="number" label="Phone:" icon={HiOutlinePhone} register={register('phone')}/> 
                <FormIconField active={false} name="social" label="Telegram:" icon={FaTelegramPlane} register={register('email')}/>
              </div>
            </div>
            <GroupButton 
              action={handleSubmit(onSubmit)}
              label={isEdit ? "Submit Change" :"Connect " }
              labelSecondary={isEdit ? "Cancel" : "Edit"}
              secondAction={()=> setIsEdit(prev => !prev)}
              secondaryButtonClass="bg-gray-200 "
              disable={isLoading}
            />
          </div>
          <div className="lg:flex grid 3xl:flex-nowrap mt-5 gap-5 w-full">
            <div className="flex-1 grid text-gray-500 gap-2 lg:gap-4 p-4 shadow-lg rounded-lg">
              <p>Security:</p>
              <FormIconField label="Password:" type="password" icon={MdOutlinePassword } register={register("email")} name="password" />
              <OutlineButton handleSubmit={()=>{}} className="text-white bg-secondary font-medium">Change password</OutlineButton>
            </div>
            <div className="flex-1 grid gap-2 lg:gap-4 text-gray-500 p-4 shadow-lg rounded-lg">
              <p>Two-factor authentification</p>
              <FormIconField label="Email:" type="email" icon={MdMailOutline} register={register("email")} name="email"/>
              <OutlineButton handleSubmit={()=>{}} className="text-white bg-secondary  font-medium">Confirm email</OutlineButton>
            </div>
          </div>
        </div>      
        <div className="flex-1 rounded-lg p-4 shadow-lg flex flex-col gap-3 2xl:gap-5 border-[1px]"> 
          <p className="text-lg font-medium">Order:</p>
          <div className="flex w-full justify-between xl:px-20"> 
            <Each 
              of={MenuOrderList}
              render={( item: any, index: number) =>  
                <OutlineButton 
                  className={`${item.color} max-w-32`} 
                  isActive={activeStep === index}
                  handleSubmit={()=>handleStepChange(index)}
                >
                  {item.name} <item.icon size={20}/>
                </OutlineButton> 
              }
            /> 
          </div>
          <hr/>
          <div className=' overflow-y-scroll overflow-x-hidden max-w-5/6 h-[450px] px-2 xl:px-10 lg:h-[700px]'> 
            <SwipeableViews
                axis={'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                className="hidden md:block"
            >
              <div>
                <ul className="flex mb-2 w-full px-4 py-2 rounded-md bg-blue-400 text-white justify-between">
                  <li>Order Id</li>
                  <li>Customer</li>
                  <li>Products</li>
                  <li>Date Time</li>
                  <li>Phone Number</li>  
                </ul> 
                <ul className='scroll-mt-6 snap-start grid gap-2 w-full'>
                  <Each
                    of={orders}
                    render={(item:OrderDto) => <ItemOrder {...item}/>}
                  />
                </ul>
              </div>
              <div>
                <ul className="flex mb-2 w-full px-4 py-2 rounded-md bg-green-400 text-white justify-between">
                  <li>Order Id</li>
                  <li>Customer</li>
                  <li>Products</li>
                  <li>Date Time</li>
                  <li>Phone Number</li>  
                </ul> 
                {
                  orders.filter(order => order.status === "pending")
                    ? <ul className='scroll-mt-6 snap-start grid gap-2'>
                        <Each
                            of={orders}
                            render={(item:OrderDto) => <ItemOrder {...item}/>}
                          />
                      </ul>
                      : <Empty icon={CiDeliveryTruck } title="Empty orders"/>
                  }
              </div>
              <div>
                <ul className="flex mb-2 w-full px-4 py-2 rounded-md bg-red-400 text-white justify-between">
                  <li>Order Id</li>
                  <li>Customer</li>
                  <li>Products</li>
                  <li>Date Time</li>
                  <li>Phone Number</li>  
                </ul> 
                {
                  orders.filter(order => order.status === "cancel").length > 0
                    ? <ul className='scroll-mt-6 snap-start grid gap-2'>
                      <Each
                          of={orders}
                          render={(item:OrderDto) => <ItemOrder {...item}/>}
                        />
                    </ul>
                  : <Empty icon={CiDeliveryTruck } title="Empty orders"/>
                } 
              </div>
            </SwipeableViews>
          </div>
        </div>
      </div>
    </Container>
  )
}
 

export default Account