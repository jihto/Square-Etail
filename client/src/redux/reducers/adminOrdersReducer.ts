import { PayloadAction, createSlice } from "@reduxjs/toolkit"; 

interface AdminOrdersState {
    peadingOrders: OrderDetailDto[]; 
    completedOrders: OrderDetailDto[];
    isLoading: boolean;
    error: null | string;
}


const initialState: AdminOrdersState = {
    peadingOrders: [], 
    completedOrders: [],
    isLoading: false,
    error: null,
};

const adminOrdersSlice = createSlice({
    name: "order",
    initialState,
    reducers: { 
        adminOrdersStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        storeAdminOrders(state: AdminOrdersState, action: PayloadAction<{pendingOrders: OrderDetailDto[], completedOrders: OrderDetailDto[]}>) {
            state.peadingOrders = action.payload.pendingOrders;  
            state.completedOrders = action.payload.completedOrders;
            state.isLoading = false;
            state.error = null;
        }, 
        confirmOrder(state: AdminOrdersState, action: PayloadAction<OrderDetailDto>) {
            state.peadingOrders = state.peadingOrders.filter(item => item.id !== action.payload.id);  
            state.completedOrders = [...state.completedOrders, action.payload];
            state.isLoading = false;
            state.error = null;
        }, 
        adminOrdersFailure(state: AdminOrdersState, action: PayloadAction<string>) { 
            state.error = action.payload; 
            state.isLoading = false;
        },  
    },
});

export default adminOrdersSlice.reducer;

export const { adminOrdersFailure, adminOrdersStart, storeAdminOrders, confirmOrder } = adminOrdersSlice.actions;  
export type RootAdminOrdersAction =  
    | typeof adminOrdersFailure 
    | typeof adminOrdersStart 
    | typeof storeAdminOrders
    | typeof confirmOrder