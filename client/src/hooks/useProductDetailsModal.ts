

import { create } from "zustand";
import { ProductDetailsDto } from "../types/ProductDetails.interface";


interface ProductDetailsModalStore{
    isOpen: boolean; 
    data: ProductDetailsDto | null;
    onOpen: (product: ProductDetailsDto) => void;
    onClose: () => void;
}

const useProductDetailsModal = create<ProductDetailsModalStore>((set) => ({
    isOpen: false,  
    data: null,
    onOpen: (data: ProductDetailsDto)=> set({isOpen: true, data}),
    onClose: ()=> set({isOpen: false, data: null})
}))

export default useProductDetailsModal;