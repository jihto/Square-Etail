import { createSlice, PayloadAction } from "@reduxjs/toolkit";  
import { getDataFromLocalStorage } from "../../utils/checkLocalStorage";
import { AdminDto } from "../../types/Admin.dto";

interface AdminState {
    admin: AdminDto | null; 
    isLoading: boolean;
    error: string | null;
}   

const initialState: AdminState = {
    admin: getDataFromLocalStorage("admin", null) ,
    isLoading: false,
    error: null,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        authAdminStart(state) {
            state.isLoading = true;
        },
        loginAdminSuccess(state, action: PayloadAction<{seller: AdminDto, categories: any[]}>) {
            state.admin = action.payload.seller;
            localStorage.setItem("admin", JSON.stringify(action.payload.seller)); 
            localStorage.setItem("categories", JSON.stringify(action.payload.categories));
            state.isLoading = false;
        },  
        authAdminFailure(state, action: PayloadAction<string>) {
            state.error = action.payload; 
            state.isLoading = false;
        }, 
        logOutAdmin(state) {
            state.admin = null;
            localStorage?.removeItem("admin");  
            localStorage?.removeItem("categories"); 
        }, 
    },
});

export default adminSlice.reducer;

export const { authAdminFailure, authAdminStart, logOutAdmin, loginAdminSuccess } = adminSlice.actions;  
export type RootAdminAction = 
    | typeof authAdminFailure
    | typeof authAdminStart
    | typeof loginAdminSuccess
    | typeof logOutAdmin;