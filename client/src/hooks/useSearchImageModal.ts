import { create } from "zustand";


interface SearchImageModalStore{
    isOpen: boolean;
    imageSeacrch: string;
    onSetImageSearch: (image: string) => void;
    onOpen: () => void;
    onClose: () => void;
}

const useSearchImageModal = create<SearchImageModalStore>((set) => ({
    isOpen: false,
    imageSeacrch: "",
    onSetImageSearch: (image: string) => set({  imageSeacrch: image }),
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false})
}))

export default useSearchImageModal;