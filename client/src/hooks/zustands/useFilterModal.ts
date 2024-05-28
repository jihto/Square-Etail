import { create } from "zustand";  


type FilterModalStore = {
    isOpen: boolean; 
    onOpen: () => void;
    onClose: () => void; 
}

const useFilterodal = create<FilterModalStore>((set) => ({
    isOpen: false,  
    onOpen: ()=> set({ isOpen: true }),
    onClose: ()=> set({ isOpen: false}),
}))

export default useFilterodal;