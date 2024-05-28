import { createSlice, PayloadAction } from "@reduxjs/toolkit";  
import { ProductDetailsDto } from "../../types/ProductDetails.interface";
import { CartDto, ItemInTheCartDto } from "../../types/Cart.dto";
import { getDataFromLocalStorage } from "../../utils/checkLocalStorage";


interface CartState{
    cart: CartDto; 
    isLoading: boolean;
    error: null | string;
}


const initialState: CartState = {
    cart: getDataFromLocalStorage("cart", {
        quantity: 0,
        totalPrice: 0,
        products: [],
        _id: ""
    }) ,  
    isLoading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: { 
        changeItem(state: CartState, action: PayloadAction<ItemInTheCartDto>) {  
            if(state.cart.products){
                state.cart.quantity += action.payload.count;
                state.cart.totalPrice += parseFloat(action.payload.product.price.toString()) * action.payload.count;
                const index = state.cart.products.findIndex((item) => item.product.id === action.payload.product.id); 
                if (index !== -1) { 
                    state.cart.products[0].count += action.payload.count;
                } else { 
                    state.cart.products.push({product:action.payload.product, count: action.payload.count});
                }  
            }else{
                state.error = "You need login first";
            }
            state.isLoading = false;
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        storeProduct(state, action: PayloadAction<CartDto>) {
            state.cart = action.payload;
            state.isLoading = false;
        },  
        removeItem(state: CartState, action: PayloadAction<ProductDetailsDto | null>) {  
            if(action.payload){
                const index = state.cart.products.findIndex((item) => item.product.id === action.payload?.id);
                if(state.cart.products[index].count > 1){
                    state.cart.products[index].count -= 1;
                } else{
                    state.cart.products.splice(index, 1);
                }
                state.cart.quantity -= 1;
                state.cart.totalPrice -= parseFloat(action.payload.price.toString());
            }
            else{
                state.cart.products = []
                state.cart.quantity = 0;
                state.cart.totalPrice = 0;
            } 
            state.isLoading = false;
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        cartLoading(state: CartState) {
            state.isLoading = true;
        },
        cartError(state, action: PayloadAction<string|null>) {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export default cartSlice.reducer;

export const { storeProduct, changeItem, removeItem, cartError, cartLoading } = cartSlice.actions;  
export type RootCartAction = 
    | typeof storeProduct
    | typeof cartError
    | typeof changeItem
    | typeof cartLoading
    | typeof removeItem;
