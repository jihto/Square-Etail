import { create } from "zustand";


interface FilterStore{
    text: string;
    categories: string[];   
    addItem: (newitem: string) => void;
    removeItem: (itemRemove: string) => void;
    onChangeText : (search: string) => void;
    onClear: () =>  void;
}

const useFilter = create<FilterStore>((set) => ({
    text:"",
    categories:['T-shirt', "Clothes", "Clock"], 
    onChangeText: (search: string) => set({ text: search }) , 
    addItem: (newItem: string) =>
        set((state: FilterStore) => ({ categories: [...state.categories, newItem]})),
    removeItem: (itemRemove: string) =>
    set((state: FilterStore) => ({ categories: [...state.categories.filter(el => el !== itemRemove) ]})),
    onClear: () => set(() => ({ categories: [], text:"" }))
}))

export default useFilter;