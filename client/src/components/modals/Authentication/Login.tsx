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
import { FormValuesLogin } from "../../../types/FormValuesLogin.interface";  
import { useSelector } from "react-redux";
import useForgetPasswordModal from "../../../hooks/zustands/useForgetpasswordModal";

const Login: React.FC<{onChangeAuth: VoidFunction}> = ({ onChangeAuth }) => { 
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootAuthAction>>();  
    const { isLoading } = useSelector((state: RootState) => state.auth);
    const { onOpen } = useForgetPasswordModal();
    const { onClose } = useAuthenticationModal(); 
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValuesLogin>({
        mode: "onChange",
    });   
    const handleForgetPassword: VoidFunction = () => {
        onClose();
        onOpen();
    }
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
            <button onClick={handleForgetPassword} className="underline flex-end w-full">Forget password?</button>
            <Button type="submit" className='bg-secondary text-white' disabled={isLoading}> Sign In </Button> 
            <button onClick={onChangeAuth} className='flex-center w-full gap-3 mb-1'> 
                <p>Don't have an account?</p> 
                <strong className="underline text-secondary"> Sign Up</strong> 
            </button>  
        </form>
    )
}


export default Login;