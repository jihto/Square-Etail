import { Dispatch } from "redux";
import { apiAdminRequest, fetchCategories } from "../api/djangoAPI";
import { RootProductAction, addProduct, changeProduct, deleteProduct, productsFailure, productsStart, storeProduct } from "../reducers/productReducer";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { ProductDetailsDto } from "../../types/ProductDetails.interface"; 

interface FilterTypeProps{
    search?: string;
    createBy?: string;
    categories?: string,
    size?: string,
    price?:string,
}

export const getCategories = async() => {
    try {
        const data = await fetchCategories();
        localStorage.setItem("categories", JSON.stringify(data || []));
    } catch (error) {
        console.log(error);
    }
}

export const getProducts = ({ search, createBy, categories, size, price }: FilterTypeProps): ThunkAction<void, RootState, unknown, RootProductAction> => {
    return async (dispatch: Dispatch<any>) => {
        try {   
            dispatch(productsStart()); 
            setTimeout(async()=>{
                let query = "/?"
                if(search) query += `&search=${search}`;
                if(createBy) query += `&createBy=${createBy}` ;
                if(categories) query += `&categories=${categories}` ;
                if(size) query += `&size=${size}` ;
                if(price) query += `&price=${price}` ;
                const result = await apiAdminRequest({
                    url: `${query}`,  
                    data: {}, 
                })      
                const response = result?.data;   
                if (response.statusCode || !Array.isArray(response)) throw new Error(response.message);  
                else{   
                    dispatch(storeProduct(response)); 
                }
                return response;
            },1000);
        } catch (error: any) { 
            dispatch(productsFailure(error.message)) 
        }
    }
};    
export const getProductsByImage = (formData: FormData): ThunkAction<void, RootState, unknown, RootProductAction> => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(productsStart()); 
        try {  
            const result = await apiAdminRequest({
                url: `/`,  
                method: "POST",
                data: formData,
                ContentType: "multipart/form-data" 
            })     
            const response = result?.data;   
            if (response.statusCode || !Array.isArray(response) ) throw new Error(response.message);  
            else{  
                dispatch(storeProduct(response)); 
            }
            return response;
        } catch (error: any) { 
            dispatch(productsFailure(error.message))
            console.log(error.message);
        }
    }
} 
export const getProductsAdmin = (): ThunkAction<void, RootState, unknown, RootProductAction> => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(productsStart()); 
        try {  
            const result = await apiAdminRequest({
                url: `product/created`,  
                data: {}, 
            })          
            const response = result?.data;
            if (response.statusCode > 201 || result.data.error ) throw new Error(response.message);  
            else{  
                setTimeout(() => {
                    dispatch(storeProduct(response.products ?? [])); 
                }, 1000)
            }
            return response;
        } catch (error: any) { 
            dispatch(productsFailure(error.message))
            console.log(error.message);
        }
    }
} 
export const getProductsInTheTrash = (): ThunkAction<void, RootState, unknown, RootProductAction> => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(productsStart()); 
        try {   
            const result = await apiAdminRequest({
                url: `product/isDeleted`,  
                data: {}, 
            });
            const response: any = result?.data; 
            if (response.statusCode > 201 || response?.error) throw new Error(response.message);  
            else{  
                dispatch(storeProduct(response.products ?? [])); 
            }
            return response;
        } catch (error: any) { 
            dispatch(productsFailure(error.message))
            console.log(error.message);
        }
    }
}
export const postCreateProduct = (formData: FormData): ThunkAction<Promise<string>, RootState, unknown, RootProductAction> => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(productsStart()); 
        try {   
            const response = await apiAdminRequest({
                method: "POST",
                url:"/product/create",
                data : formData,
                ContentType: "multipart/form-data"
            });  
            if (response.statusCode || response?.data.error ) throw new Error(response.message);  
            else{   
                dispatch(addProduct(response?.data?.data as ProductDetailsDto)); 
            }
            return response?.data.success;
        } catch (error: any) { 
            dispatch(productsFailure(error.message))
            console.log(error.message);
            return error.message;
        }
    }
}
export const postUpdateProduct = (productId: string, formData: object): ThunkAction<Promise<string>, RootState, unknown, RootProductAction> => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(productsStart()); 
        try {   
            const response = await apiAdminRequest({
                method: "PUT",
                url:`/product/update/${productId}`,
                data : formData,
                ContentType: "multipart/form-data"
            });   
            if (response.statusCode || response?.data.error || typeof response === "string") throw new Error(response.message);  
            else{   
                console.log(response?.data?.data);
                dispatch(changeProduct(response?.data?.data as ProductDetailsDto)); 
            }
            return response?.data.success;
        } catch (error: any) { 
            dispatch(productsFailure(error.message))
            console.log(error.message);
            throw error.message;
        }
    }
}
export const postRemoveProduct = ( productId: string ): ThunkAction<Promise<string>, RootState, unknown, RootProductAction> => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(productsStart()); 
        try {   
            const response = await apiAdminRequest({
                method: "POST",
                url:`/product/deleted/${productId}`,
                data : {}, 
            });  
            console.log(response);
            if (response?.status > 201 || response?.data.error ) throw new Error(response.message);  
            else{    
                dispatch(deleteProduct(productId)); 
            }
            return response?.data.success;
        } catch (error: any) { 
            dispatch(productsFailure(error.message))
            console.log(error.message);
            throw error.message;
        }
    }
}
export const postRestoreProduct = ( productId: string ): ThunkAction<Promise<string>, RootState, unknown, RootProductAction> => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(productsStart()); 
        try {   
            const response = await apiAdminRequest({
                method: "POST",
                url:`/product/restore/${productId}`,
                data : {}, 
            });  
            console.log(response);
            if (response?.status > 201 || response?.data.error ) throw new Error(response.message);  
            else{    
                dispatch(deleteProduct(productId)); 
            }
            return response?.data.success;
        } catch (error: any) { 
            dispatch(productsFailure(error.message))
            console.log(error.message);
            throw error.message;
        }
    }
}