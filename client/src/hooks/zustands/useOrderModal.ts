import { create } from "zustand"; 
import { ItemInTheCartDto } from "../../types/Cart.dto";


interface OrderModalStore{
    data: ItemInTheCartDto[] | null;
    totalPrice: number;
    currentStep: number; 
    onOpen: (data: ItemInTheCartDto[]) => void;
    onClose: () => void;
    onChangeStep : (index: number, data?: string) => void;
}

const useOrderModal = create<OrderModalStore>((set) => ({
    data: null,
    totalPrice: 0,
    currentStep: -1, 
    onOpen: (data: ItemInTheCartDto[])=> set({currentStep: 0, data, totalPrice: data.reduce((t, el) => t += el.count * el.product.price, 0)}),
    onClose: ()=> set({ data: null, currentStep: -1}),
    onChangeStep: (index: number) => set({ currentStep: index }) 
}))

export default useOrderModal;