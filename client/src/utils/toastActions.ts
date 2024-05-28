

async function toastActions(isError: boolean = false, duration: number = 1000): Promise<void> {  
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            isError ? resolve() : reject(new Error()); 
        }, duration); 
    });
}; 
export default toastActions;