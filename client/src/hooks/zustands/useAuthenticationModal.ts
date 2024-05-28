

import { create } from "zustand";


interface AuthenticationModalStore{
    isOpen: boolean; 
    onOpen: () => void;
    onClose: () => void;
}

const useAuthenticationModal = create<AuthenticationModalStore>((set) => ({
    isOpen: false,  
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false})
}))

export default useAuthenticationModal;