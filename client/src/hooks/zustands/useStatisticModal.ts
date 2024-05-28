import { create } from "zustand";  


type StatisticModalStore = {
    isOpen: boolean; 
    title: string;
    description: string;
    type: TypeChart;
    onOpen: (title: string, description: string, type?: TypeChart) => void;
    onClose: () => void; 
}

const useStatisticModal = create<StatisticModalStore>((set) => ({
    isOpen: false,  
    title: "",
    description: "",
    type: 'order',
    onOpen: (
        title: string, 
        description: string, 
        type?: TypeChart
    )=> set({ isOpen: true, title, description, type }),
    onClose: (  )=> set({ isOpen: false, description: "", title: ""}),
}))

export default useStatisticModal;