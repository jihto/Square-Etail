import { Dispatch } from 'redux'; 
import { ThunkAction } from 'redux-thunk';   
import { RootState } from '../store'; 
import { RootAdminAction, authAdminFailure, authAdminStart, logOutAdmin, loginAdminSuccess } from '../reducers/adminReducer';
import { FormValuesLogin } from '../../types/FormValuesLogin.interface';
import { apiAdminRequest, setAdminToken } from '../api/djangoAPI';

export const adminLogin = (
    data: FormValuesLogin
): ThunkAction<Promise<{message: string, error:boolean}>, RootState, unknown, RootAdminAction> => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(authAdminStart()); 
        try {  
            const response = await apiAdminRequest({
                url:"api/token/",
                method: "POST",
                data: data, 
            })  
            if(response.detail) throw new Error(response.detail);
            await setAdminToken(response.data.access)
            const admin = await apiAdminRequest({
                url:"seller/",
                method: "GET",
                data: {}, 
            })   
            if(!admin.data || admin.status > 201) throw new Error(admin.data.error); 
            const result = { 
                ...admin.data, 
                seller: {...admin.data.seller, token: response.data.access }
            }
            await dispatch(loginAdminSuccess(result)); 
            return {
                message: "Login success",
                error: false
            }; 
        } catch (error: any) {
            dispatch(authAdminFailure(error.message));
            return {
                message: error.message,
                error: true
            }
        }
    };
};    




export const adminLogout = (): ThunkAction<void, RootState, unknown, RootAdminAction> => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(authAdminStart()); 
        try {       
            dispatch(logOutAdmin());
        } catch (error: any) {
            dispatch(authAdminFailure(error.message)); 
        }
    };
};    
