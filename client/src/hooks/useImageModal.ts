import { create } from "zustand";


interface ImageModalStore{
    isOpen: boolean; 
    uploadImage: File | null;
    onSetImage: (upload: File | null) => void; 
    onOpen: () => void;
    onClose: () => void;
    onClear: VoidFunction;
}

const useImageModal = create<ImageModalStore>((set) => ({
    isOpen: false, 
    uploadImage: null,
    onSetImage: (uploadImage: File | null) => set({ uploadImage }), 
    onOpen: ()=> set({ isOpen: true, uploadImage: null }),
    onClose: ()=> set({ isOpen: false }) ,
    onClear: () => set({ uploadImage: null }),
}));

export default useImageModal;