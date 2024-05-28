
export const getDataFromLocalStorage = (item: string, dataReturn: any): any => {
    const data = localStorage.getItem(item); 
    return data ? JSON.parse(data) : dataReturn; 
}