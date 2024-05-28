import { create } from "zustand";

interface ProductShow{
    picture: string;
    name: string
}

interface ToastModalStore{ 
    isShow: boolean; 
    data: ProductShow;
    onShow: (data: ProductShow) => void;  
} 


const useToast = create<ToastModalStore>((set) => ({ 
    isShow: false,  
    data: {
        name: "",
        picture: ""
    },
    onShow: (data: ProductShow)=> { 
        set({ isShow: true, data})
        setTimeout(() => {
            set({
                isShow: false, 
                data: {
                    name: "",
                    picture: ""
                }
            })
        }, 3000);
    }, 
}))

export default useToast;