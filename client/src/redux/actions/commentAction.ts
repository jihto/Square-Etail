import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { RootReviewsAction, addReviews, reviewsError, reviewLoadings, storeReviews } from "../reducers/reviewsReducer";
import { apiAdminRequest } from "../api/djangoAPI";

export const getReviews = (productId: string, token:string): ThunkAction<void, RootState, unknown, RootReviewsAction> => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(reviewLoadings());
            if(!token || !productId) throw new Error("Missing fields data");
            const result = await apiAdminRequest({
                url: `reviews/?productId=${productId}&token=${token}`,  
                data: {}, 
            })        
            if(result.error || typeof result === "string" || !result.data) throw new Error(result.error); 
            if (!result) { 
                console.warn("Failed to fetch reviews data."); 
                dispatch(reviewsError('Failed to retrieve cart items')); 
            } else {  
                dispatch(storeReviews(result.data || []));  
            }
        } catch (error) { 
            console.error("An unexpected error occurred:", error);
            dispatch(reviewsError('An error occurred while fetching cart items'));  
        }
    };
};


export const createReviews = (formData: FormData, productId:string): ThunkAction<Promise<string>, RootState, unknown, RootReviewsAction> => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(reviewLoadings());
            if(!formData || !productId) return "Missing fields data";

            const result = await apiAdminRequest({
                url: `reviews/create/${productId}`,  
                method: "POST",
                data: formData, 
                ContentType:"multipart/form-data"
            })        
            if(result.error || typeof result === "string" || !result.data) throw new Error(result.error);  
            if (!result) { 
                console.warn("Failed to fetch reviews data."); 
                dispatch(reviewsError('Failed to retrieve cart items')); 
            } else {  
                dispatch(addReviews(result.data.data)); 
                return result?.data.message; 
            }
        } catch (error) { 
            console.error("An unexpected error occurred:", error);
            dispatch(reviewsError('An error occurred while fetching cart items'));  
            return "Reviews Fail"
        }
    };
};
