import { Dispatch } from "redux";
import { API } from "../api/djangoAPI"; 
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { RootOrderAction, ordersFailure, ordersStart, storeOrders } from "../reducers/orderReducer";
import { OrderDto } from "../../types/Order.dto";

export const getOrders = (userId: string): ThunkAction<void, RootState, unknown, RootOrderAction> => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(ordersStart()); 
        try {    
            const result = await API(`order/?userId=${userId}`); 
            if (result?.status > 201 || !Array.isArray(result?.data) || typeof result?.data === "string") throw new Error(result?.statusText);  
            dispatch(storeOrders(result?.data as OrderDto[])); 
            return result?.data; 
        } catch (error: any) { 
            console.log(error.message);
            dispatch(ordersFailure(error.message))
        }
    }
};   


export const postOrder: (data:FormData | any,) => Promise<{message: string, code: string}> = async(data: FormData) => {
    try {  
        const result: any = await API(`order/create`, { 
            method: "POST",
            data: data, 
        });  
        if (result.statusCode || result.error || typeof result === "string") throw new Error(result.error);
        return result?.data;
    } catch (error: any) {   
        throw error?.message;
    } 
};   




