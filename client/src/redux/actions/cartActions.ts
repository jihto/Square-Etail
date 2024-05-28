import { ThunkAction } from "redux-thunk"; 
import { RootCartAction, changeItem, cartError, removeItem, storeProduct, cartLoading } from "../reducers/cartReducer";
import { Dispatch } from "redux"; 
import { fetchCart } from "../api";
import { RootState } from "../store";
import { ProductDetailsDto } from "../../types/ProductDetails.interface"; 
import { ItemInTheCartDto } from "../../types/Cart.dto";

export const getItemInTheCart = (): ThunkAction<void, RootState, unknown, RootCartAction> => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(cartLoading())
            const cartData = await fetchCart();    
            if (!cartData) { 
                console.warn("Failed to fetch cart data.");
                localStorage.setItem("cart","{}");
                dispatch(cartError('Failed to retrieve cart items')); 
            } else { 
                localStorage.setItem("cart", JSON.stringify(cartData));
                dispatch(storeProduct(cartData));  
            }
        } catch (error) { 
            console.error("An unexpected error occurred:", error);
            dispatch(cartError('An error occurred while fetching cart items'));  
        }
    };
};

export const changeItemInTheCart = (addProduct: ItemInTheCartDto): ThunkAction<void, RootState, unknown, RootCartAction> => {
    return async (dispatch: Dispatch<any>) => {
        try {  
            dispatch(cartLoading())  
            !addProduct   
                ? dispatch(cartError('Failed to retrieve cart items')) 
                : dispatch(changeItem(addProduct)); 
        } catch (error) { 
            console.error("An unexpected error occurred:", error);
            dispatch(cartError('An error occurred while fetching cart items'));  
        }
    };
}; 


export const deleteItemFromTheCart = (itemRemove?: ProductDetailsDto | null): ThunkAction<void, RootState, unknown, RootCartAction> => {
    return async (dispatch: Dispatch<any>) => { 
        dispatch(cartLoading())
        try { 
            dispatch(removeItem(itemRemove ?? null))
        } catch (error) { 
            console.error("An unexpected error occurred:", error);
            dispatch(cartError('An error occurred while fetching cart items'));  
        }
    };
}; 
