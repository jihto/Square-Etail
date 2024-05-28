import { create } from "zustand"; 
import React, { ReactNode } from "react";


type ConfirmModalStore = {
    isOpen: boolean;
    title: string; 
    action?: React.ReactNode ;
    content: string | React.ReactNode; 
    onOpen: (title: string ,content: string | ReactNode, action?: ReactNode) => void;
    onClose: () => void; 
}

const useConfirmModal = create<ConfirmModalStore>((set) => ({
    isOpen: false,  
    content: "",
    title: "", 
    action: null, 
    onOpen: (title: string, content: string | ReactNode, action?: ReactNode)=> set({ isOpen: true, content, title, action }),
    onClose: ()=> set({ isOpen: false, content: "", title: "" }), 
}))

export default useConfirmModal;