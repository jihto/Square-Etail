import { create } from "zustand";
import { ProductDetailsDto } from "../types/ProductDetails.interface";


interface ChangeProductModalStore{
    data: ProductDetailsDto | null,
    isOpen: boolean; 
    onOpen: (data: ProductDetailsDto | null) => void;
    onClose: () => void;
}

const useChangeProductModal = create<ChangeProductModalStore>((set) => ({
    isOpen: false,  
    data: null,
    onOpen: (data: ProductDetailsDto | null)=> set({ isOpen: true, data }),
    onClose: ()=> set({ isOpen: false, data: null })
}))

export default useChangeProductModal;