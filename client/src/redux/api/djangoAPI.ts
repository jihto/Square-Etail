import axios from "axios";
import { ApiRequestProps } from "../../types/ApiRquest.dto";
import { getDataFromLocalStorage } from "../../utils/checkLocalStorage";
 

export const API = axios.create({
    baseURL: "http://127.0.0.1:8000"
})  
 

const token = getDataFromLocalStorage("admin", "").token;
export function setAdminToken(token: string){
    if (token) {  
        API.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${token}`;  
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    } else {
        delete API.defaults.headers.common['Authorization'];
        localStorage.removeItem('token'); 
    }
} 
 

export const apiAdminRequest = async({ url, data, method , ContentType = "application/json"}: ApiRequestProps) => {   
    try {  
        const result = await API(url,{
            method: method || "GET",
            data,   
            headers: {  
                'Content-Type': ContentType, 
                'Authorization': `Bearer ${token}`
            }, 
        })  
        if(result.status > 400) throw new Error(result.statusText)
        return result;
    } catch (error: any) {
        const err = error.response.data; 
        return err;
    } 
} 
 

export const fetchProductsByImage = async(formData: FormData) => {
    try{
        const result = await apiAdminRequest({
            url: `/`,  
            method: "POST",
            data: formData,
            ContentType: "multipart/form-data" 
        })     
        return result?.data;
    } catch (error: any) {
        const err = error.response?.data; 
        return err;
    } 
}

export const createOrder = async(data: FormData) => {
    try{ 
        const result = await API(`order/create`, { 
            method: "POST",
            data: data, 
        }); 
        return result;
    } catch (error: any) {
        const err = error.response?.data; 
        return err;
    } 
}

 
export const fetchStatisticAdmin = async() => {
    try{ 
        const result = await apiAdminRequest({
            url: 'seller/statistic',
            data: {}
        });   
        if(result.data.error) throw new Error(result.data.error);
        return result?.data.data; 
    } catch (error: any) {
        console.log(error.response?.data);
        return [];
    }  
}
 