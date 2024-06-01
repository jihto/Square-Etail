import Modal from '../Modal'
import FormField from '../../inputs/FormField'
import { Button } from '../../buttons/Button'
import { MdArrowBackIos } from 'react-icons/md'
import useForgetPasswordModal from '../../../hooks/zustands/useForgetpasswordModal'
import useAuthenticationModal from '../../../hooks/zustands/useAuthenticationModal'
import { SubmitHandler, useForm } from 'react-hook-form'
import { motion } from 'framer-motion';
import { useState } from 'react'
import toast from 'react-hot-toast'
import { postChangePassword, postRequestChangePassword, postVerifyOTP } from '../../../redux/actions/authActions'

interface ChangePasswordValues{
    password: string;
    confirmPassword: string;
}

const ChangePassword:React.FC<{token:string}> = ({ token }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ChangePasswordValues>();
    const  { onClose } = useForgetPasswordModal();
    const onSubmit: SubmitHandler<ChangePasswordValues> = async(data) =>{
        console.log(token);
        if(data.password === data.confirmPassword)
            if(token){
                try{
                    const result: string = await postChangePassword(token, data.password);
                    toast.success(result);
                    onClose();
                }catch(error: any){
                    toast.error("Password is not same!!!"); 
                }
            } 
        toast.error("Password is not same!!!"); 
    }
    return (
        <>  
            <div className='text-center text-gray-500'>
                <p className='text-lg '> Change your new password  </p>
                <p> After change you can back to login with new password</p> 
            </div>
            <div className="grid grid-cols-2 gap-5">
                <FormField 
                    name='password'
                    labelName='New password'
                    type='password'
                    placeholder='Enter your password'
                    register={register("password", {
                        required: "password is required",
                        minLength: {
                            value: 8,  
                            message: "Password must be at least 8 characters long",  
                        },
                    })}
                    autoFocus={true}
                    error={errors.password?.message} 
                />
                <FormField 
                name='confirmPassword'
                labelName='Confirm password'
                type='password'
                placeholder='Enter your password'
                register={register("confirmPassword", {
                    required: "password is required",
                    minLength: {
                        value: 8,  
                        message: "Password must be at least 8 characters long",  
                    },
                })}
                autoFocus={true}
                error={errors.password?.message} 
            />
            </div> 
            <Button handleSubmit={handleSubmit(onSubmit)}>Submit</Button>
        </> 
    )
}


const ForgetPasswordModal: React.FC = () => {
    const  { isOpen, onClose } = useForgetPasswordModal();
    const login = useAuthenticationModal();
    const { register, handleSubmit, formState: { errors } } = useForm<{email: string}>()
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [email, setEmail]= useState<string>("");
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const [ token, setToken ] = useState<string>("");
    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newOtp = [...otp];
        newOtp[index] = event.target.value;
        setOtp(newOtp); 
        // Navigate to the next input if there is a value
        if (event.target.value) {
            const nextIndex = index + 1;
            if (nextIndex < otp.length) {
                const nextInput = document.querySelector<HTMLInputElement>(`input[data-index="${nextIndex}"]`);
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }
    };

    const onSubmit: SubmitHandler<{email: string}> = async(data) => { 
        try{
            console.log(data)
            const result = await postRequestChangePassword(data.email);
            setEmail(data.email);
            toast.success(result);
            setStep(2);
        }catch(error: any){
            toast.error(error.message);
        }
    }
    const handleVerifyOtp = async() => {
        try{
            const finalOtp: string = otp.join(''); 
            if(email && finalOtp){
                const result = await postVerifyOTP(email, finalOtp);
                setToken(result);
                toast.success("Verify success");
                setStep(3);
            }
        }catch(error: any){
            toast.error(error.message);
        }
    }
    const handleBackToLogin: VoidFunction = () => {
        onClose();
        login.onOpen();
    }
    return (
        <Modal 
            title={"Forget Password"}
            onClose={onClose}
            isOpen={isOpen}   
        >  
            <div className='relative h-60'>
                <motion.div 
                    initial={{ opacity: 100 }} 
                    animate={step === 1 ? { opacity: 100 } : { opacity:0, display: "none"  }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}  
                    className='absolute top-0 pb-3 pt-3 px-4 flex w-full flex-col gap-5'
                >
                    <p className='text-center text-lg text-gray-500'>
                        Enter your email and we will send you a link to reset your password
                    </p>
                    <FormField 
                        name='email'
                        type='email' 
                        placeholder='Enter your email'
                        register={register("email", {
                            required: "Email Address is required",
                        })}
                        autoFocus={true}
                        error={errors.email?.message}
                    />
                    <button onClick={handleBackToLogin} className='flex items-center'><MdArrowBackIos /> Back to Login</button>
                    <Button handleSubmit={handleSubmit(onSubmit)}>Send</Button>
                </motion.div>
                <motion.div 
                    initial={{  opacity: 0 }}
                    animate={step === 2 ? { opacity: 100 } : { opacity:0 , display: "none" }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className='absolute top-0 pb-3 pt-3 px-4 flex w-full flex-col gap-5' 
                >
                    <p className='text-center text-lg text-gray-500'>
                        An OTP code has send to {email}, kindly enter the code below to reset your password 
                    </p> 
                    <div className="flex justify-center">
                        {otp.map((value, index) => (
                            <input
                                type="text"
                                maxLength={1}
                                key={index}
                                data-index={index}
                                value={value}
                                onChange={(event) => handleChange(index, event)}
                                className="otp-input-field w-12 h-12 mx-2 border border-gray-400 rounded-md text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ))}
                    </div>
                    <button onClick={handleSubmit(onSubmit)} className='text-end underline text-secondary'>Send otp again?</button>
                    <Button handleSubmit={handleVerifyOtp}>Submit</Button>
                </motion.div> 
                <motion.div 
                    initial={{  opacity: 0 }}
                    animate={step === 3 ? { opacity: 100 } : { opacity:0 , display: "none" }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className='pb-3 pt-3 px-4 flex w-full flex-col gap-5' 
                >
                    <ChangePassword token={token}/>            
                </motion.div>
            </div>
        </Modal>
    )
}

export default ForgetPasswordModal