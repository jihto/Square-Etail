import { createSlice, PayloadAction } from "@reduxjs/toolkit";   
import { ProductDetailsDto } from "../../types/ProductDetails.interface";

interface AdminProductsState {
    products: ProductDetailsDto | {}; 
}   

const initialState: AdminProductsState = {
    products: {} 
};

const adminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {
        getProducts(state: AdminProductsState, action: PayloadAction<ProductDetailsDto>) {
            state.products = action.payload;
        }, 
    },
});

export default adminProductsSlice.reducer;

export const { getProducts } = adminProductsSlice.actions;  
export type RootAdminProductsAction = 
    | typeof getProducts 