import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { RootNotificateAction, newNotification, notificationFailure, notificationStart, storeNotification } from "../reducers/notificationReducer";
import { Dispatch } from "redux";
import { apiRequest } from "../api";
import { NotificationDto, isNotificationDto } from "../../types/Notification.dto";

export const getNotifications = (): ThunkAction<void, RootState, unknown, RootNotificateAction> => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(notificationStart()); 
        try {     
            const result = await apiRequest({
                url: "/notification/user",
                data: {},
            });   
            if ( !result || result.statusCode > 201) {
                console.error(`fetch failed with status code: ${result.statusCode}`);
                throw new Error(`fetch failed with status code: ${result.statusCode}`)
            } 
            await dispatch(storeNotification(result ?? [])) ; 
        } catch (error: any) { 
            console.log(error.message);
            dispatch(notificationFailure(error.message))
        }
    }
};   

export const getAdminNotifications = (id: string): ThunkAction<void, RootState, unknown, RootNotificateAction> => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(notificationStart()); 
        try {     
            const result = await apiRequest({
                url: `/notification/seller/${id}`,
                data: {},
            });   
            if ( !result || result.statusCode > 201) {
                console.error(`fetch failed with status code: ${result.statusCode}`);
                throw new Error(`fetch failed with status code: ${result.statusCode}`)
            } 
            await dispatch(storeNotification(result ?? [])) ; 
        } catch (error: any) { 
            console.log(error.message);
            dispatch(notificationFailure(error.message))
        }
    }
};   

export const updateReadingNotificate= (_id: string): ThunkAction<void, RootState, unknown, RootNotificateAction> => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await apiRequest({
                url: `notification/user/${_id}`,
                method: "PUT",
                data: {}
            })
            if(response.status !== 200) throw new Error(response?.message);
            dispatch(updateReadingNotificate(_id));
        } catch (error) {
            console.error(error);
        }
    }
}

export const postNewNotification = (notification: NotificationDto): ThunkAction<void, RootState, unknown, RootNotificateAction> => {
    return async (dispatch: Dispatch<any>) => {
        try {  
            if(isNotificationDto(notification)){
                dispatch(newNotification(notification));
            }
        } catch (error) {
            console.error(error);
        }
    }
}