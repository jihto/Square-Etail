import { create } from "zustand";


interface OrderModalStore{
    data: string;
    currentStep: number;
    isOpen: boolean; 
    onOpen: () => void;
    onClose: () => void;
    onChangeStep : (index: number, data?: string) => void;
}

const useOrderModal = create<OrderModalStore>((set) => ({
    data: "",
    currentStep:0,
    isOpen: false,  
    onOpen: ()=> set({isOpen: true, data: ""}),
    onClose: ()=> set({isOpen: false, data: "", currentStep: 0}),
    onChangeStep: (index: number, data?:string) => set({ currentStep: index, data: data }) 
}))

export default useOrderModal;