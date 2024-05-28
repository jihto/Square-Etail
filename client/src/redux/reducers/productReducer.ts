import { createSlice, PayloadAction } from "@reduxjs/toolkit";  
import { ProductDetailsDto } from "../../types/ProductDetails.interface";
interface ProductState {
    products: ProductDetailsDto[] | []; 
    isLoading: boolean;
    error: null | string;
}


const initialState: ProductState = {
    products: [], 
    isLoading: false,
    error: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: { 
        productsStart(state) {
            state.isLoading = true;
        },
        storeProduct(state: ProductState, action: PayloadAction<ProductDetailsDto[] >) {
            state.products = action.payload;  
            state.isLoading = false;
        }, 
        addProduct(state: ProductState, action: PayloadAction<ProductDetailsDto>) {
            if(action.payload){ 
                state.products = [...state.products, action.payload];
                state.isLoading = false;
            }
        },
        changeProduct(state: ProductState, action: PayloadAction<ProductDetailsDto>){
            const updatedProducts = state.products.map((product) =>
                product.id === action.payload.id ? action.payload : product
            ); 
            const updatedIndex = updatedProducts.findIndex(
                (product) => product.id === action.payload.id
            );
            if (updatedIndex !== -1) {
            const updatedProduct = updatedProducts.splice(updatedIndex, 1)[0];
            updatedProducts.unshift(updatedProduct);
            }
        
            state.products = updatedProducts;
            state.isLoading = false;
        },
        deleteProduct(state: ProductState, action: PayloadAction<string>){
            state.products = state.products.filter((product) => product.id !== action.payload);
            state.isLoading = false;
        }, 
        productsFailure(state, action: PayloadAction<string>) { 
            state.error = action.payload; 
            state.isLoading = false;
        },  
    },
});

export default productSlice.reducer;

export const { storeProduct, productsStart,addProduct, changeProduct,  deleteProduct, productsFailure } = productSlice.actions;  
export type RootProductAction =  
    | typeof storeProduct 
    | typeof addProduct
    | typeof changeProduct
    | typeof deleteProduct 
    | typeof productsStart 
    | typeof productsFailure