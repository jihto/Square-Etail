import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootAuthAction } from "../../../redux/reducers/authReducer";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { userRegister } from "../../../redux/actions/authActions";
import toast from "react-hot-toast"; 
import FormField from "../../inputs/FormField";
import { Button } from "../../buttons/Button";
 
interface FormValuesRegister{
    username: string;
    name : string;
    email: string;
    city: string;
    country: string;
    password: string;
    confirmPassword: string;
}


const SignUp:React.FC<{onChangeAuth: VoidFunction}> = ({onChangeAuth}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValuesRegister>({
        mode: "onChange",
    });   

    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootAuthAction>>();
    const { isLoading } = useSelector((state: RootState) => state.auth);  

    const onSubmit: SubmitHandler<FormValuesRegister> = async(data: FormValuesRegister) => { 
        if(data.confirmPassword === data.password){
            try{
                const {confirmPassword, username ,...formData} = data; 
                const result = await  dispatch(userRegister(formData));
                toast.success(typeof result === "string" ? result : "");
            }catch(error: any){
                toast.error(error.message);
            }
        }else{
            toast.error("Passwords do not match!");
        }
    }  
    return (
        <div className='text-center gap-3 grid'>  
            <div className='grid grid-cols-2 gap-3'>
                <FormField 
                    name='name' 
                    autoFocus
                    placeholder='Enter name...' 
                    labelName='Name'
                    register={register("name", {
                        required: "Name is required!", 
                    })}
                    error={errors.name ? errors.name?.message : ""}
                />
                <FormField  
                    type='email'
                    name='email'  
                    placeholder='abc@gmail.com' 
                    labelName='Email'
                    register={register("email", {
                        required: "email is required!", 
                    })}
                    error={errors.email ? errors.email?.message : ""}
                />
                <FormField  
                    name='city'
                    placeholder='City...'
                    labelName='City'
                    register={register("city" )}
                    error={errors.city ? errors.city?.message : ""}
                />
                <FormField  
                    name='country' 
                    placeholder='...' 
                    labelName='Country'
                    register={register("country")}
                    error={errors.country ? errors.country?.message : ""}    
                />
            </div>
            <FormField  
                name='password'
                type='password' 
                placeholder='Enter password...' 
                labelName='Password'
                register={register("password", {
                    required: "password is required!", 
                    minLength: {
                        value: 8,  
                        message: "Password must be at least 8 characters long",  
                    },
                })}    
                error={errors.password ? errors.password?.message : ""}
            />
            <FormField  
                name='confirmPassword'
                type='password' 
                placeholder='Confirm your password...' 
                labelName='Confirm Password'
                register={register("confirmPassword", {
                    required: "password is required!", 
                    minLength: {
                        value: 8,  
                        message: "Password must be at least 8 characters long",  
                    },
                })}    
                error={errors.confirmPassword ? errors.confirmPassword?.message : ""}
            />  
            <button onClick={onChangeAuth} className='flex-end w-full mb-1 gap-3'>
                    <p>Already have an account? </p>
                    <strong className="text-secondary underline">Log In</strong> 
                </button>
            <hr/> 
            <Button handleSubmit={handleSubmit(onSubmit)}>{isLoading ? "isLoading..." :"Sign Up" }</Button> 
        </div>
    )
}

export default SignUp;