

import { create } from "zustand";
import { OrderDto } from "../../types/Order.dto";


interface OrderDetailsModalStore{
    data: OrderDto | null;
    isAdmin: boolean; 
    isOpen: boolean; 
    onOpen: (data: OrderDto, isAdmin?: boolean) => void;
    onClose: () => void; 
}

const useOrderDetailsModal = create<OrderDetailsModalStore>((set) => ({
    data: null,
    isAdmin: false, 
    isOpen: false,  
    onOpen: (data: OrderDto, isAdmin: boolean = false)=> set({isOpen: true, data, isAdmin}),
    onClose: ()=> set({isOpen: false, data: null}), 
}))

export default useOrderDetailsModal;