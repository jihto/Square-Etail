import { ThunkAction } from "redux-thunk";
import { RootAdminProductsAction } from "../reducers/adminProductsReducer";
import { RootState } from "../store";
import { Dispatch } from "redux";
import { apiAdminRequest } from "../api/djangoAPI";

export const adminProduct = (): ThunkAction<void, RootState, unknown, RootAdminProductsAction> => {
    return async (dispatch: Dispatch<any>) => { 
        try {  
            const response = await apiAdminRequest({
                url:"api/token/", 
                data: {}, 
            })  
            if(response.detail) throw new Error(response.detail);  
        } catch (error: any) { 
            return {
                message: error.message,
                error: true
            }
        }
    };
};    

