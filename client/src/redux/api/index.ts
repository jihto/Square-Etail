import axios, { AxiosResponse } from 'axios'; 
import { ApiRequestProps } from '../../types/ApiRquest.interface';  
const api = axios.create({
    baseURL: 'http://localhost:3000'
}) 
let tokenStore = JSON.parse(localStorage.getItem("user") ?? "{}").token;
let viewProducts = JSON.parse(localStorage.getItem("views") ?? "[]" )

export function setAuthToken(token: string){
    if (token) { 
        tokenStore = token;
        api.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${token}`;  
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    } else {
        delete api.defaults.headers.common['Authorization'];
        localStorage.removeItem('token'); 
    }
} 


export const apiRequest = async({url, data, method, ContentType = "application/json"}: ApiRequestProps) => {
    try { 
        const result: AxiosResponse = await api(url,{
            method: method || "GET",
            data: data, 
            headers: { 
                "content-type": ContentType, 
                credentials: 'include',
            } 
        }) 
        return result?.data;
    } catch (error: any) {
        const err = error.response.data; 
        return err ;
    } 
}


export const fetchCart = async (): Promise< any | undefined> => {
    try {
        const result = await apiRequest({
            url: "/cart",
            data: {},
        });  
        if ( !result ) {
            console.error(`Cart fetch failed with status code: ${result.statusCode}`);
            return undefined;  
        } 
        return result;
    } catch (error) {
        console.error("Error fetching cart:", error);
        throw null;  
    }
};

export const updateViewProduct = async(id: string): Promise<void> => {
    try {  
        if(!viewProducts.includes(id)){ 
            const result = await apiRequest({
                url: `/user/views/${id}`,
                method: "POST",
                data: {},
            });   
            if ( !result ) {
                console.error(`view failed with status code: ${result.statusCode}`);
                return undefined;  
            }  
            viewProducts.push(id);
            localStorage.setItem('views', JSON.stringify(viewProducts));
        } 
    } catch (error) {
        console.error("Error fetching cart:", error); 
    }
}