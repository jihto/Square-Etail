import { createSlice, PayloadAction } from "@reduxjs/toolkit";   
import { OrderDto } from "../../types/Order.dto";
interface OrderState {
    orders: OrderDto[]; 
    isLoading: boolean;
    error: null | string;
}


const initialState: OrderState = {
    orders: [], 
    isLoading: false,
    error: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: { 
        ordersStart(state) {
            state.isLoading = true;
        },
        storeOrders(state: OrderState, action: PayloadAction<OrderDto[] >) {
            state.orders = action.payload;  
            state.isLoading = false;
        }, 
        ordersFailure(state: OrderState, action: PayloadAction<string>) { 
            state.error = action.payload; 
            state.isLoading = false;
        },  
    },
});

export default orderSlice.reducer;

export const { ordersStart, storeOrders, ordersFailure } = orderSlice.actions;  
export type RootOrderAction =  
    | typeof ordersStart 
    | typeof storeOrders 
    | typeof ordersFailure