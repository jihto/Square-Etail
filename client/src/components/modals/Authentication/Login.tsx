import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../redux/store";
import { RootAuthAction } from "../../../redux/reducers/authReducer";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuthenticationModal from "../../../hooks/zustands/useAuthenticationModal";
import { userLogin } from "../../../redux/actions/authActions";
import toast from "react-hot-toast";
import toastActions from "../../../utils/toastActions";
import FormField from "../../inputs/FormField";
import { Button } from "../../buttons/Button"; 
import { FormValuesLogin } from "../../../types/FormValuesLogin";  

const Login: React.FC<{onChangeAuth: VoidFunction}> = ({ onChangeAuth }) => { 
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootAuthAction>>();  
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValuesLogin>({
        mode: "onChange",
    });   
    const { onClose } = useAuthenticationModal(); 
    const onSubmit: SubmitHandler<FormValuesLogin> = async(data) => { 
        try{  
            const result = await dispatch(userLogin(data.username, data.password)); 
            await toast.promise(
                toastActions(typeof result === 'string' ? false : true),
                    {
                        loading: 'Loading...',
                        success: <b>Log in success</b>,
                        error: <b>{typeof result === 'string' ? result :""}</b>,
                    }
            );
            await onClose() 
        }catch(err){
            console.log("Error in Submit");
        } 
    };
    
    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className='text-center gap-3 grid'
        >  
            <div className='grid gap-3'>
                <p className='text-3xl font-medium'>Let's Get Started</p>
                <p className='font-medium text-gray-500'>Please enter information below.</p>
            </div>
            <FormField 
                name='username'
                autoFocus={true}  
                placeholder='Enter email...'  
                labelName='Email'
                register={register("username", {
                    required: "Email Address is required",
                })}
                error={errors.username?.message}
            />
            <FormField  
                name='password'
                type='password' 
                placeholder='Enter password...' 
                labelName='Password'  
                register={register("password", {
                    required: "Password is required!",
                    minLength: {
                        value: 8,  
                        message: "Password must be at least 8 characters long",  
                    },
                })}
                error={ errors.password?.message}
            />   
            <button onClick={onChangeAuth} className='flex-end w-full gap-3 mb-1'> 
                <p>Don't have an account?</p> 
                <strong className="underline text-secondary"> Sign Up</strong> 
            </button>  
            <Button type="submit" className='bg-secondary text-white' > Sign In </Button> 
        </form>
    )
}


export default Login;