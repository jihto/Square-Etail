import { Dispatch } from 'redux'; 
import { ThunkAction } from 'redux-thunk'; 
import { RootAuthAction, logOut, authFailure, authStart, loginSuccess, registerSuccess, changeInformationUser } from '../reducers/authReducer';
import { apiRequest, setAuthToken } from '../api'; 
import { RootState } from '../store';
import { getItemInTheCart } from './cartActions'; 
import { getDataFromLocalStorage } from '../../utils/checkLocalStorage';   
import { UserDto } from '../../types/User.interface';
import { getNotifications } from './notificationAction';
import { ItemInTheCartDto } from '../../types/Cart.dto'; 

export const userLogin = (
  username: string,
  password: string
): ThunkAction<void, RootState, unknown, RootAuthAction> => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(authStart()); 
    try {  
      const response = await apiRequest({ 
          url: "auth/login",
          data: { username, password },
          method: "POST", 
      }); 
      if (response.statusCode) throw new Error(response.message);  
      else{
        await setAuthToken(response.token);
        await dispatch(getItemInTheCart());
        await dispatch(getNotifications());
        await dispatch(loginSuccess(response)); 
      }
      return response;
    } catch (error: any) {
      dispatch(authFailure(error.message));
      return error.message;
    }
  };
};    


export const userRegister = (
  {...props}
): ThunkAction<void, RootState, unknown, RootAuthAction> => {
    return async (dispatch: Dispatch<any>) => {
      dispatch(authStart());
      try {     
        const response = await apiRequest({ 
          url: "auth/register",
          data: props,
          method: "POST" 
      }); 
      if (response.statusCode) {
        throw new Error(response.message || "Server error");  
      }
      dispatch(registerSuccess());
      return response.message;
    } catch (error: any) {
      dispatch(authFailure(error.message));
      throw new Error(error.message);
    }
  }
}; 

interface AuthUser {
  email: string;  
  given_name: string;
  id:string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}
export const loginWithSocial = (data: AuthUser): ThunkAction<void, RootState, unknown, RootAuthAction> => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(authStart());
    try {     
      const formData = {
        email: data.email,
        name: data.name,
        password: data.id,
        avatar: data.picture
      }
      const response = await apiRequest({ 
        url: "auth/login/social",
        data: formData,
        method: "POST" 
    }); 
    if (response.statusCode) {
      throw new Error(response.message || "Server error");  
    }
    await setAuthToken(response.token);
    await dispatch(getItemInTheCart());
    await dispatch(getNotifications())  
    await dispatch(loginSuccess(response as UserDto));  
  } catch (error: any) {
    dispatch(authFailure(error.message));
    throw new Error(error.message);
  }
}
}; 

export const userLogout = (): ThunkAction<void, RootState, unknown, RootAuthAction> => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(authStart()); 
    try {      
      //Update cart item to server before log out
      const cartData = getDataFromLocalStorage("cart", null);
      if(cartData){
        const products = cartData.products.map((item: ItemInTheCartDto) =>  ({...item, product:item.product.id.toString()}))
        const response = await apiRequest({ 
            url: `cart/update/${cartData._id}`,
            data: { products: products },
            method: "PUT" 
        });  
        if (response.statusCode !== 200) throw new Error('response.message');
        dispatch(logOut());
      }   
    } catch (error: any) {
      dispatch(authFailure(error.message)); 
    }
  };
};    


export const updateInformationUser = (dataUpdate: UserDto): ThunkAction<Promise<boolean>, RootState, unknown, RootAuthAction> => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(authStart()); 
    try {      
      //Update cart item to server before log out 
      const user = localStorage.getItem("user")
      if(dataUpdate && user){ 
        const response = await apiRequest({ 
            url: "user/update",
            data: { updateUserDto: dataUpdate },
            method: "PATCH" 
        });  
        const token = JSON.parse(user).token;
        if (response.statusCode) throw new Error(response.message);  
        else{  
          dispatch(loginSuccess({token,...response})); 
          return true;
        }
      }  
    } catch (error: any) {
      dispatch(authFailure(error.message)); 
      return false;
    }
    return false;
  };
};    

export const updateAvatarUser = (formData: FormData): ThunkAction<Promise<boolean>, RootState, unknown, RootAuthAction> => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(authStart()); 
    try {        
      const response = await apiRequest({ 
        url: "user/upload/avatar",
        method: "POST",
        data: formData,
        ContentType:'multipart/form-data',
      });   
      if (response.statusCode) throw new Error(response.message);  
      else{  
        dispatch(changeInformationUser({key: "avatar", value: response})); 
        return true;
      } 
    } catch (error: any) {
      dispatch(authFailure(error.message)); 
      return false;
    } 
  };
};

export const postRequestChangePassword = async(email: string): Promise<string> =>{
  try {
    const response = await apiRequest({
      url: "auth/forget-password",
      method: "POST",
      data: {email}
    });
    if (response.status > 201 || response.statusCode > 201) throw new Error(response.message);
    return response.response;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const postVerifyOTP = async(email: string, otp: string): Promise<string> =>{
  try {
    const response = await apiRequest({
      url: "auth/verify-otp",
      method: "POST", 
      data: {email, otp}
    }); 
    if (response.status > 201 || response.statusCode > 201) throw new Error(response.message);
    return response.response;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const postChangePassword = async(token: string, newPassword: string): Promise<string> =>{
  try {
    const response = await apiRequest({
      url: `auth/change-password/${token}`,
      method: "POST", 
      data: { password: newPassword }
    });
    if (response.status > 201 || response.statusCode > 201) throw new Error(response.message);
    console.log(response);
    return response.response;
  } catch (error: any) {
    throw new Error(error.message);
  }
}