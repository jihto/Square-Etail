

import { create } from "zustand"; 


interface ForgetPasswordModalStore{ 
    currentStep: number;
    isOpen: boolean; 
    onOpen: () => void;
    onClose: () => void; 
}

const useForgetPasswordModal = create<ForgetPasswordModalStore>((set) => ({ 
    currentStep:0,
    isOpen: false,  
    onOpen: ()=> set({ isOpen: true }),
    onClose: ()=> set({ isOpen: false }), 
}))

export default useForgetPasswordModal;