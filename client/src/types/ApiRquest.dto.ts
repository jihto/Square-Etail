export interface ApiRequestProps{
    url: string; 
    data: FormData | any;
    method?: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
    ContentType?: "application/json" | "multipart/form-data";
}