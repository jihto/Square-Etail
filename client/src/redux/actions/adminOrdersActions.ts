import { Dispatch } from "redux";
import { apiAdminRequest } from "../api/djangoAPI"; 
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";  
import { RootAdminOrdersAction, adminOrdersFailure, adminOrdersStart, confirmOrder, storeAdminOrders } from "../reducers/adminOrdersReducer";

export const fetchDataAdminOrders = (): ThunkAction<void, RootState, unknown, RootAdminOrdersAction> => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(adminOrdersStart()); 
        try {   
            const result = await apiAdminRequest({
                url: `order/order_details`,  
                data: {}, 
            })         
            if(result.data.error) throw new Error(result.data.error); 
            const response = result.data.data; 
            await dispatch(storeAdminOrders(response));  
        } catch (error: any) { 
            dispatch(adminOrdersFailure(error.message))
            console.log(error.message);
        }
    }
};   


export const putConfirmOrder = (id: string): ThunkAction<Promise<string>, RootState, unknown, RootAdminOrdersAction> => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(adminOrdersStart()); 
        try {     
            const result = await apiAdminRequest({
                url: `order/confirm`,  
                method: "PUT",
                data: {"orderDetailId" : id}, 
                ContentType:  "multipart/form-data"
            })        
            console.log(result);
            if(result.error || result.data.error) throw new Error(result.error); 
            if(result.data) dispatch(confirmOrder(result.data.data));
            return result?.data.success;
        } catch (error: any) {   
            dispatch(adminOrdersFailure(error.message))
            throw new Error(error?.message); 
        } 
    };   
}

export const putCancelOrder = (id: string): ThunkAction<Promise<string>, RootState, unknown, RootAdminOrdersAction> => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(adminOrdersStart()); 
        try {     
            const result = await apiAdminRequest({
                url: `order/cancel`,  
                method: "PUT",
                data: {"orderDetailId" : id}, 
                ContentType:  "multipart/form-data"
            })        
            console.log(result);
            if(result.error || result.data.error) throw new Error(result.error); 
            if(result.data) dispatch(confirmOrder(result.data.data));
            return result?.data.success;
        } catch (error: any) {   
            console.log({ error })
            dispatch(adminOrdersFailure(error.message))
            throw new Error(error?.message); 
        } 
    };   
}
