import { create } from "zustand";


interface FilterStore{
    text: string;
    image: null | File;
    categories: string[];   
    onAddItem: (newitem: string) => void;
    onRemoveItem: (itemRemove: string) => void;
    onChangeText : (search: string) => void;
    onClear: () =>  void;
    onSetImageSearch: (image: null | File) => void;
}

const useFilter = create<FilterStore>((set) => ({
    text: "",
    image: null,
    categories:[], 
    onChangeText: (search: string) => set({ text: search }) , 
    onAddItem: (newItem: string) =>
        set((state: FilterStore) => ({ categories: [...state.categories, newItem]})),
    onRemoveItem: (itemRemove: string) =>
        set((state: FilterStore) => ({ categories: [...state.categories.filter(el => el !== itemRemove) ]})),
    onSetImageSearch: (image: null | File) => set(() => ({ image })), 
    onClear: () => set(() => ({ categories: [], text:"" })),
}))

export default useFilter;