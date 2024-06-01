import { useCallback, useState } from 'react'
import Modal from '../Modal'
import useAuthenticationModal from '../../../hooks/zustands/useAuthenticationModal' 
import Login from './Login';
import SignUp from './SignUp';
import { useGoogleLogin } from '@react-oauth/google';
import { IoLogoFacebook } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { loginWithSocial } from '../../../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'; 
import { RootAuthAction } from '../../../redux/reducers/authReducer';
import { RootState } from '../../../redux/store';
import toast from 'react-hot-toast';
import toastActions from '../../../utils/toastActions';

const AuthenticationModal = () => {
    const { isOpen, onClose } = useAuthenticationModal();
    const [isSignIn, setIsSignIn] = useState<boolean>(true);

    const handleChangeAuth: VoidFunction = useCallback(() => setIsSignIn(prev => !prev ), []);  
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootAuthAction>>();   
    //Google AuthO2
    const login: any = useGoogleLogin({
        onSuccess: async(codeResponse) =>{
            const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
                headers: {
                    Authorization: `Bearer ${codeResponse.access_token}`,
                    Accept: 'application/json'
                }
            });
            try{
                const result = await dispatch(loginWithSocial(response?.data))
                await toast.promise(
                    toastActions(typeof result === 'string' ? false : true),
                        {
                            loading: 'Loading...',
                            success: <b>Log in success</b>,
                            error: <b>{typeof result === 'string' ? result :""}</b>,
                        }
                );
                onClose();
            }catch(error){
                toast.error("Login Fail")
            }
        },
        onError: (error) => console.log('Login Failed:', error)
    }); 
    return (
        <Modal 
            isOpen={isOpen}
            onClose={onClose} 
            className="w-[98%] sm:w-5/6 md:w-3/5 xl:w-1/3 h-fit text-center"
        > 
            <div className='grid gap-3'>
                {
                    isSignIn 
                        ? <>
                            <p className='text-3xl font-medium'>Let's Get Started</p>
                            <p className='text-lg text-gray-500'>Please enter information below.</p>
                        </>
                        :
                        <>
                            <p className='text-3xl font-medium'>Sign Up account</p>
                            <p className='text-lg text-gray-500'>Create new account fill in the blank below.</p>
                        </> 
                }
            </div>
            <div className='mx-5 md:mx-6 xl:mx-8 mb-5 flex flex-col gap-5'>
                {isSignIn ? <Login onChangeAuth={handleChangeAuth}/> : <SignUp onChangeAuth={handleChangeAuth}/>}  
                <div className='relative w-full'>
                    <div className='w-full h-[1px] bg-gray-400'></div>
                    <p className='bg-white absolute -top-3 left-[45%] w-10 text-gray-400 font-medium'>OR</p>
                </div>  
                <div className='grid grid-cols-2 justify-center gap-5'>
                    <button className='border rounded-full flex-center gap-4 items-center px-5 py-1 text-gray-700 shadow-md'>
                        <IoLogoFacebook  className='text-blue-700' size={30}/>
                        {/* <FacebookLogin
                            appId={"8288134361213547"}
                            autoLoad={false}
                            fields="name,email,picture"
                            onClick={responseMessage}
                            callback={errorMessage} 
                            cssClass='p-0'
                            textButton={`Login with Facebook `}
                        /> */}
                        Sign In with facebook
                    </button>   
                    <button className="border rounded-full flex-center gap-4 items-center px-5 text-gray-700 shadow-md" onClick={login}><FcGoogle/>Sign in with google</button>
                </div> 
            </div>
        </Modal>
    )
}


export default AuthenticationModal