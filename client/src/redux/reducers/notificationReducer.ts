import { createSlice, PayloadAction } from "@reduxjs/toolkit";   
import { NotificationDto } from "../../types/Notification.dto";
import { getDataFromLocalStorage } from "../../utils/checkLocalStorage";
interface NotificationState {
    notifications: NotificationDto[]; 
    isLoading: boolean;
    error: null | string;
}


const initialState: NotificationState = {
    notifications: getDataFromLocalStorage("notifications", []), 
    isLoading: false,
    error: null,
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: { 
        notificationStart(state) {
            state.isLoading = true;
        },
        storeNotification(state: NotificationState, action: PayloadAction<NotificationDto[] >) {
            state.notifications = action.payload;  
            localStorage.setItem("notifications", JSON.stringify(action.payload))
            state.isLoading = false;
        }, 
        newNotification(state: NotificationState, action: PayloadAction<NotificationDto>){
            const data = getDataFromLocalStorage("notifications", []);
            const result = [...data, action.payload];
            state.notifications = result;
            localStorage.setItem("notifications", JSON.stringify(result))
            state.isLoading = false;
        },
        updateReadingNotification(state: NotificationState, action: PayloadAction<string>) {
            state.notifications = state.notifications.map((item: NotificationDto) => item._id === action.payload ?  { ...item, isReading: true } : item);  
            state.isLoading = false;
        }, 
        notificationFailure(state: NotificationState, action: PayloadAction<string>) { 
            state.error = action.payload; 
            state.isLoading = false;
            state.notifications = [];
        },  
    },
});

export default notificationSlice.reducer;

export const { notificationStart, storeNotification, updateReadingNotification, newNotification ,notificationFailure } = notificationSlice.actions;  
export type RootNotificateAction =  
    | typeof notificationStart 
    | typeof storeNotification 
    | typeof notificationFailure
    | typeof newNotification
    | typeof updateReadingNotification;