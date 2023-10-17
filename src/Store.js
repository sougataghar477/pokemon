import { create } from 'zustand'

const useStore = create((set) => ({
  items: [],
  addItem: (newItem) => set((state) => ({
    items: [...state.items, newItem],
  })),
  removeItem:(id) => set((state) => ({
    items: state.items.filter(item => item.id !==id),
  }))
  
}))
export default useStore;