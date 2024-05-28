import FormField from '../../components/inputs/FormField'
import { Button } from '../../components/buttons/Button'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormValuesLogin } from '../../types/FormValuesLogin' 
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../redux/store'
import { RootAdminAction } from '../../redux/reducers/adminReducer'
import { adminLogin } from '../../redux/actions/adminActions'
import toastActions from '../../utils/toastActions' 

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootAdminAction>>();   
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValuesLogin>({
        mode: "onChange",
    });   
    const onSubmit: SubmitHandler<FormValuesLogin> = async(data) => {  
        const result = await dispatch(adminLogin(data));  
        await toast.promise(
            toastActions(!result.error),
                {
                    loading: 'Loading...',
                    success: <b>{result.message}</b>,
                    error: <b>{result.message}</b>,
                }
        ); 
        navigate("/admin/home")
    }
    return (
        <div className='absolute w-full h-screen'>
            <div className=' flex justify-center h-screen items-center'>
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className='border-gray-200 border-2 shadow-lg p-10 rounded-xl grid gap-4 w-min-full md:w-2/3 lg:w-1/2 xl:w-1/4 text-black'
                >
                    <h1 className='text-3xl'>Square Etail</h1>   
                    <p>Wellcome back to the Admin page</p>
                    <FormField  
                        register={register("username", {
                            required: "Email Address is required",
                        })} 
                        name='Email' 
                        placeholder='Input email...' 
                        error={errors.username?.message}
                        autoFocus 
                    />
                    <FormField 
                        register={register("password", {
                            required: "Password is required!",
                            minLength: {
                                value: 8,  
                                message: "Password must be at least 8 characters long",  
                            },
                        })}
                        name='password' 
                        placeholder='Input password...'
                        type='password' 
                        error={ errors.password?.message} 
                    /> 
                    <p className='flex justify-end underline'>Forgot password?</p>
                    <Button className='bg-secondary text-white' type='submit'>Submit</Button>
                </form> 
            </div>
        </div>
    )
}

export default Login